import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import { StatItem } from "@/lib/types";
import { Stat } from "@/models/stat";

type GetStatsResponse =
  | {
      success: true;
      stats: StatItem[];
    }
  | {
      success: false;
      message: string;
    };

export async function getStatsData(): Promise<GetStatsResponse> {
  try {
    await connectDB();

    const stats = await Stat.find({}).lean();

    return {
      success: true,
      stats: serializeData(stats) as StatItem[],
    };
  } catch (error) {
    console.error("getStats error:", error);

    return {
      success: false,
      message: "Failed to fetch stats",
    };
  }
}
