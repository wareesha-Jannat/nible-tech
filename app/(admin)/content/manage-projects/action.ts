"use server";

import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { serializeData } from "@/lib/utils";
import {
  ProjectBackendType,
  ProjectFormType,
  projectBackendSchema,
} from "@/lib/validations/project";
import { ProjectItem } from "@/lib/types";

/* -------------------------------- ADD -------------------------------- */

type AddProjectData = {
  imageFile: File | null;
  restData: ProjectBackendType;
};

type AddProjectResponse =
  | {
      success: true;
      message: string;
      newProject: ProjectItem;
    }
  | {
      success: false;
      message: string;
    };

export async function addProject({
  imageFile,
  restData,
}: AddProjectData): Promise<AddProjectResponse> {
  try {
    // convert form data → backend schema shape
    const parsed = projectBackendSchema.safeParse(restData);

    if (!parsed.success) {
      return { success: false, message: "Invalid project data" };
    }

    await connectDB();

    const project = await Project.create(parsed.data);

    if (imageFile) {
      const imageData = await uploadToCloudinary(
        imageFile,
        "projects",
        project._id.toString(),
      );

      project.image = imageData;
      await project.save();
    }

    return {
      success: true,
      message: "Project created successfully",
      newProject: serializeData(project.toObject()),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create project",
    };
  }
}

/* -------------------------------- UPDATE -------------------------------- */

type UpdateProjectData = {
  id: string;
  imageFile: File | null;
  removeImage: boolean;
  restData: ProjectBackendType;
};

type UpdateProjectResponse =
  | {
      success: true;
      message: string;
      updated: ProjectItem;
    }
  | {
      success: false;
      message: string;
    };

export async function updateProject({
  id,
  imageFile,
  removeImage,
  restData,
}: UpdateProjectData): Promise<UpdateProjectResponse> {
  try {
    const parsed = projectBackendSchema.safeParse(restData);

    if (!parsed.success) {
      return { success: false, message: "Invalid project data" };
    }

    await connectDB();

    const project = await Project.findById(id);

    if (!project) {
      return { success: false, message: "Project not found" };
    }

    // IMAGE UPDATE
    if (imageFile) {
      const imageData = await uploadToCloudinary(imageFile, "projects", id);

      project.image = imageData;
    }

    // REMOVE IMAGE
    else if (removeImage && project.image?.public_id) {
      await deleteFromCloudinary(project.image.public_id);
      project.image = null;
    }

    // UPDATE FIELDS
    project.title = parsed.data.title;
    project.description = parsed.data.description;
    project.technologies = parsed.data.technologies;
    project.features = parsed.data.features;
    project.featured = parsed.data.featured;

    await project.save();

    return {
      success: true,
      message: "Project updated successfully",
      updated: serializeData(project.toObject()),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update project",
    };
  }
}

/* -------------------------------- DELETE -------------------------------- */

type DeleteProjectResponse =
  | {
      success: true;
      message: string;
      deletedId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteProjectDB(
  id: string,
): Promise<DeleteProjectResponse> {
  try {
    await connectDB();

    const project = await Project.findById(id);

    if (!project) {
      return {
        success: false,
        message: "Project not found",
      };
    }

    if (project.image?.public_id) {
      await deleteFromCloudinary(project.image.public_id);
    }

    await Project.findByIdAndDelete(id);

    return {
      success: true,
      message: "Project deleted successfully",
      deletedId: id,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to delete project",
    };
  }
}
