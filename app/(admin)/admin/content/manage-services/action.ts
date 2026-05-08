"use server";

import { ServiceItem } from "@/lib/types";
import { generateSlug, serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import {
  serviceBackendSchema,
  ServiceBackendType,
} from "@/lib/validations/service";

import { auth } from "@/lib/auth";
import Service from "@/models/Service";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

type AddServiceResponse =
  | {
      success: true;
      message: string;
      newService: ServiceItem;
    }
  | {
      success: false;
      message: string;
    };

export async function addService(
  data: ServiceBackendType,
): Promise<AddServiceResponse> {
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

    const parsed = serviceBackendSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid service data",
      };
    }
    await connectDB();
  const slug = generateSlug(parsed.data.title);

    const metaTitle = `${parsed.data.title}`;

    const metaDescription =
      parsed.data.shortDescription.length > 150
        ? parsed.data.shortDescription.slice(0, 150) + "..."
        : parsed.data.shortDescription;

    // ----------------------------
    // CREATE SERVICE
    // ----------------------------
    const res = await Service.create({
      ...parsed.data,
      slug,
      metaTitle,
      metaDescription,
    });
    const plain = res.toObject();
    await revalidatePath("/admin/content");
    return {
      success: true,
      message: "Service added successfully",
      newService: serializeData(plain) as ServiceItem,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while adding the service, try again later",
    };
  }
}

type UpdateServiceResponse =
  | {
      success: true;
      message: string;
      updated: ServiceItem;
    }
  | {
      success: false;
      message: string;
    };

export async function updateService(
  id: string,
  data: ServiceBackendType,
): Promise<UpdateServiceResponse> {
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
    const parsed = serviceBackendSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid service data",
      };
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid service ID",
      };
    }
    await connectDB();
    const existing = await Service.findById(id);

    if (!existing) {
      return {
        success: false,
        message: "Service not found",
      };
    }

    const titleChanged = existing.title !== parsed.data.title;

    const descriptionChanged =
      existing.shortDescription !== parsed.data.shortDescription;

    // --------------------
    // start with existing values
    // --------------------
    let slug = existing.slug;
    let metaTitle = existing.metaTitle;
    let metaDescription = existing.metaDescription;

    // --------------------
    // update only if needed
    // --------------------
    if (titleChanged) {
      slug = generateSlug(parsed.data.title);
      metaTitle = parsed.data.title;
    }

    if (descriptionChanged) {
      metaDescription =
        parsed.data.shortDescription.length > 150
          ? parsed.data.shortDescription.slice(0, 150) + "..."
          : parsed.data.shortDescription;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        slug,
        metaTitle,
        metaDescription,
      },
      { returnDocument: "after" },
    ).lean();

    if (!updatedService) {
      return {
        success: false,
        message: "Service not found",
      };
    }
    await revalidatePath("/admin/content");
    return {
      success: true,
      message: "Service updated successfully",
      updated: serializeData(updatedService) as ServiceItem,
    };
  } catch (error) {
    console.error("Update service error:", error);

    return {
      success: false,
      message: "An error occurred while updating the service",
    };
  }
}

type DeleteServiceResponse =
  | {
      success: true;
      message: string;
      deletedId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteServiceDB(
  id: string,
): Promise<DeleteServiceResponse> {
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid service ID",
      };
    }
    await connectDB();

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
        message: "Service not found",
      };
    }
    await revalidatePath("/admin/content");
    return {
      success: true,
      message: "Service deleted successfully",
      deletedId: deleted._id.toString(),
    };
  } catch (error) {
    console.error("delete service error:", error);

    return {
      success: false,
      message: "An error occurred while deleting the service",
    };
  }
}

type UpdatePriorityResponse =
  | {
      success: true;
      updated: ServiceItem;
    }
  | {
      success: false;
      message: string;
    };

export async function updateServiceOrder(
  id: string,
  order: number,
): Promise<UpdatePriorityResponse> {
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
    if (!id) {
      return {
        success: false,
        message: "Service ID is required",
      };
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid service ID",
      };
    }

    const parsedPriority = Number(order);

    if (isNaN(parsedPriority)) {
      return {
        success: false,
        message: "Priority must be a valid number",
      };
    }

    if (parsedPriority < 0) {
      return {
        success: false,
        message: "Priority cannot be negative",
      };
    }
    await connectDB();
    const updatedDoc = await Service.findByIdAndUpdate(
      id,
      { order: parsedPriority },
      { new: true },
    ).lean();

    if (!updatedDoc) {
      return {
        success: false,
        message: "Service not found",
      };
    }
    await revalidatePath("/admin/content");
    return {
      success: true,
      updated: serializeData(updatedDoc) as ServiceItem,
    };
  } catch (error) {
    console.error("updateServicePriority error:", error);

    return {
      success: false,
      message: "Something went wrong while updating priority",
    };
  }
}
