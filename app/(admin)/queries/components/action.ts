"use server";

import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { ContactFormType, contactSchema } from "@/lib/validations/contact";
import { Query } from "@/models/Query";

export type UpdateQueryStatusInput = {
  id: string;
  status: "new" | "in-progress" | "completed";
};

export type UpdateQueryStatusResponse =
  | {
      success: true;
      updated: {
        _id: string;
        status: string;
        updatedAt: string;
      };
    }
  | {
      success: false;
      message: string;
    };

export async function updateQueryStatus(
  input: UpdateQueryStatusInput,
): Promise<UpdateQueryStatusResponse> {
  try {
    await connectDB();

    const updatedQuery = await Query.findByIdAndUpdate(
      input.id,
      {
        status: input.status,
        updatedAt: new Date(),
      },
      { returnDocument: "after" },
    ).lean();

    if (!updatedQuery) {
      return {
        success: false,
        message: "Query not found",
      };
    }

    return {
      success: true,
      updated: {
        _id: updatedQuery._id.toString(),
        status: updatedQuery.status,
        updatedAt: updatedQuery.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("updateQueryStatus error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

type UpdateQueryParams = {
  id: string;
  data: ContactFormType;
};

export async function updateQuery({ id, data }: UpdateQueryParams) {
  try {
    await connectDB();

    // ✅ 1. validate using Zod
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: parsed.error.flatten(),
      };
    }

    const validData = parsed.data;

    // ✅ 2. update DB
    const updated = await Query.findByIdAndUpdate(
      id,
      {
        ...validData,
        updatedAt: new Date(),
      },
      { returnDocument: "after" },
    ).lean();

    if (!updated) {
      return {
        success: false,
        message: "Query not found",
      };
    }

    return {
      success: true,
      updatedQuery: serializeData(updated),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update query",
    };
  }
}

export async function deleteQuery(id: string) {
  try {
    await connectDB();

    const deleted = await Query.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
        message: "Query not found",
      };
    }

    return {
      success: true,
      deletedId: id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete query",
    };
  }
}
