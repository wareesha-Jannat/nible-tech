"use server";

import { ServiceItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import {
  serviceBackendSchema,
  ServiceBackendType,
} from "@/lib/validations/service";
import { Service } from "@/models/Service";

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
    console.log(data);
    const parsed = serviceBackendSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid service data",
      };
    }
    await connectDB();
    const res = await Service.create(parsed.data);
    const plain = res.toObject();
    return {
      success: true,
      message: "Service added successfully",
      newService: serializeData(plain),
    };
  } catch (error) {
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
    const parsed = serviceBackendSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid service data",
      };
    }

    await connectDB();

    const updatedService = await Service.findByIdAndUpdate(id, parsed.data, {
      returnDocument: "after",
    }).lean();

    if (!updatedService) {
      return {
        success: false,
        message: "Service not found",
      };
    }

    return {
      success: true,
      message: "Service updated successfully",
      updated: serializeData(updatedService),
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
    await connectDB();

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
        message: "Service not found",
      };
    }

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

export async function updateServicePriority(id: string, priority: number) {
  try {
    if (!id) {
      return {
        success: false,
        message: "Service ID is required",
      };
    }

    const parsedPriority = Number(priority);

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

    const updatedDoc = await Service.findByIdAndUpdate(
      id,
      { priority: parsedPriority },
      { new: true },
    ).lean();

    if (!updatedDoc) {
      return {
        success: false,
        message: "Service not found",
      };
    }

    return {
      success: true,
      updated: serializeData(updatedDoc),
    };
  } catch (error) {
    console.error("updateServicePriority error:", error);

    return {
      success: false,
      message: "Something went wrong while updating priority",
    };
  }
}
