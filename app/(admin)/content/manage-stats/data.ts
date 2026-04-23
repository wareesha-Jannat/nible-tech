import { initialStats } from "@/lib/seed-data";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Stat } from "@/models/stat";
import { StatItem } from "@/lib/types";

type GetStatsResponse = {
  success: boolean;
  error: string | null;
  data: StatItem[] | null;
};

export const getStats = async (): Promise<GetStatsResponse> => {
  try {
    await connectDB();
    let stats = await Stat.find().lean();
    if (stats.length === 0) {
      await Stat.insertMany(initialStats);
      stats = await Stat.find().lean();
    }
    return {
      success: true,
      error: null,
      data: serializeData(stats),
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      success: false,
      error: "Failed to fetch stats",
      data: null,
    };
  }
};
