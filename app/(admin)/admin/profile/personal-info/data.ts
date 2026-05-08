import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { UserItem } from "@/lib/types";

type GetUserDataResponse = {
  success: boolean;
  error: string | null;
  data: UserItem | null;
};

export async function getUserData(id: string): Promise<GetUserDataResponse> {
  try {
    await connectDB();
    console.log(id);
    const user = await User.findById(id).select("-password").lean();

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
      data: serializeData(user) as UserItem,
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
