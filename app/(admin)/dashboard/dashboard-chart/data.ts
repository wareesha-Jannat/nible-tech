import { ChartData } from "@/lib/types";
import { connectDB } from "@/lib/db";
import { Query } from "@/models/Query";

type QueryTrendsResponse = {
  success: boolean;
  message: string;
  data: ChartData[];
};

export async function getQueryTrends(
  filter: "week" | "month" | "year",
): Promise<QueryTrendsResponse> {
  try {
    await connectDB();
    const now = new Date();

    let startDate;
    let groupFormat;

    if (filter === "week") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
      groupFormat = { $dayOfWeek: "$createdAt" };
    } else {
      startDate = new Date();
      startDate.setFullYear(now.getFullYear() - 1);
      groupFormat = { $month: "$createdAt" };
    }

    if (filter === "month") {
      const startDate = new Date();
      startDate.setDate(now.getDate() - 29); // last 30 days

      // 1. Get daily aggregated data
      const data = await Query.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            queries: { $sum: 1 },
          },
        },
      ]);

      // 2. Build full 30-day sequence (fill missing days with 0)
      const daily: { date: Date; queries: number }[] = [];

      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);

        const found = data.find(
          (item) =>
            item._id.day === d.getDate() &&
            item._id.month === d.getMonth() + 1 &&
            item._id.year === d.getFullYear(),
        );

        daily.push({
          date: d,
          queries: found ? found.queries : 0,
        });
      }

      // 3. Group into chunks of 5 days
      const result: ChartData[] = [];

      for (let i = 0; i < daily.length; i += 5) {
        const chunk = daily.slice(i, i + 5);

        const total = chunk.reduce((sum, item) => sum + item.queries, 0);

        const start = chunk[0].date;
        const end = chunk[chunk.length - 1].date;

        const label = `${start.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })} - ${end.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })}`;

        result.push({
          name: label,
          queries: total,
        });
      }

      return {
        success: true,
        message: "Successfully fetched",
        data: result,
      };
    }

    const data = await Query.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: groupFormat,
          queries: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // FORMAT + FILL MISSING DATA

    if (filter === "week") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const result = days.map((day) => ({
        name: day,
        queries: 0,
      }));

      data.forEach((item) => {
        const index = item._id - 1; // MongoDB: 1 = Sun
        result[index].queries = item.queries;
      });

      return {
        success: true,
        message: "Successfully fetched",
        data: result,
      };
    }

    // year
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const result = months.map((month) => ({
      name: month,
      queries: 0,
    }));

    data.forEach((item) => {
      const index = item._id - 1; // 1 = Jan
      result[index].queries = item.queries;
    });

    return {
      success: true,
      message: "Successfully fetched",
      data: result,
    };
  } catch (error) {
    console.log("error in getQueryTrends", error);
    return {
      success: false,
      message: "Failed to fetch Query Trend, try again later",
      data: [],
    };
  }
}
