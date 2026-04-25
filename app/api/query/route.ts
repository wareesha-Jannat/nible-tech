import { connectDB } from "@/lib/db";
import { Query } from "@/models/Query";
import mongoose from "mongoose";

type MongoTextQuery = {
  $regex: string;
  $options?: "i";
};

type MongoIdQuery = {
  $lt?: mongoose.Types.ObjectId;
};

type FilterQuery = {
  _id?: MongoIdQuery;
  status?: string;
  $or?: Array<{
    name?: MongoTextQuery;
    email?: MongoTextQuery;
    projectType?: MongoTextQuery;
    message?: MongoTextQuery;
  }>;
};

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const limit = Number(searchParams.get("limit") || 10);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: FilterQuery = {};

    // pagination (cursor-based)
    if (cursor) {
      query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
    }

    // status filter
    if (status && status !== "all") {
      query.status = status;
    }

    // search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { projectType: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const data = await Query.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = data.length > limit;
    const results = hasMore ? data.slice(0, limit) : data;

    const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

    return Response.json({
      queries: results,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Failed to fetch queries" },
      { status: 500 },
    );
  }
}
