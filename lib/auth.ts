import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import { User } from "@/models/User";
import { loginSchema } from "./validations/login";

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.code = message;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new CustomError("Invalid input");
        }

        const { email, password } = parsed.data;

        await connectDB();

        const user = await User.findOne({ email }).lean();

        if (!user) {
          throw new CustomError("User not found");
        }

        if (!user.password) {
          throw new CustomError("Invalid account setup");
        }

        if (user.role !== "SUPER_ADMIN") {
          throw new CustomError("Unauthorized access");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("is Match", isMatch, user.password);

        if (!isMatch) {
          throw new CustomError("Invalid credentials");
        }

        // ✅ THIS IS IMPORTANT (what goes into token)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image?.url || null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // runs on login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
});
