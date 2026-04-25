"use server";

import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { ContactFormType, contactSchema } from "@/lib/validations/contact";
import { Query } from "@/models/Query";
import { auth } from "@/lib/auth";
import { QueryItem } from "@/lib/types";

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
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "unauthorized",
      };
    }
    if (session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Forbidden",
      };
    }
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

type UpdateQueryResponse =
  | {
      success: true;
      updatedQuery: QueryItem;
    }
  | {
      success: false;
      message: string;
      errors?: unknown;
    };

export async function updateQuery({
  id,
  data,
}: UpdateQueryParams): Promise<UpdateQueryResponse> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "unauthorized",
      };
    }

    if (session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Forbidden",
      };
    }

    await connectDB();

    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const validData = parsed.data;

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
      updatedQuery: serializeData(updated) as QueryItem,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update query",
    };
  }
}

type DeleteQueryResponse =
  | {
      success: true;
      deletedId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteQuery(id: string): Promise<DeleteQueryResponse> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "unauthorized",
      };
    }

    if (session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Forbidden",
      };
    }

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
