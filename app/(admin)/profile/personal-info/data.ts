import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
export async function getUserData() {
  try {
    await connectDB();

    const user = await User.findOne().select("-password").lean();

    if (!user) {
      return {
        success: false,
        error: "User not found",
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: serializeData(user),
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      error: "Failed to fetch user data",
      data: null,
    };
  }
}
