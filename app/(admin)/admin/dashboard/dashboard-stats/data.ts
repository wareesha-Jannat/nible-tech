import { Stats } from "@/lib/types";
import { connectDB } from "@/lib/db";
import { Query } from "@/models/Query";

export type StatsResponse = {
  success: boolean;
  data: Stats;
  message?: string;
};

export async function getQueriesOverview(): Promise<StatsResponse> {
  try {
    await connectDB();
    const [total, newCount, inProgress, completed] = await Promise.all([
      Query.countDocuments(),
      Query.countDocuments({ status: "new" }),
      Query.countDocuments({ status: "in-progress" }),
      Query.countDocuments({ status: "completed" }),
    ]);
    return {
      success: true,
      data: {
        total,
        new: newCount,
        inProgress,
        completed,
      },
    };
  } catch (error) {
    console.error("Error fetching query stats:", error);

    return {
      success: false,
      data: {
        total: 0,
        new: 0,
        inProgress: 0,
        completed: 0,
      },
      message: "Failed to fetch query stats",
    };
  }
}
