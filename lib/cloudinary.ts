
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
export default cloudinary;

 type DeleteResult = {
  success: boolean;
  error?: string;
};

 type UploadResult = {
  url: string;
  public_id: string;
};

export const uploadToCloudinary = async (
  file: File,
  folder: string,
  publicId: string,
): Promise<UploadResult> => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `nibleTech/${folder}`,
          public_id: publicId,
          overwrite: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);

    throw new Error(error?.message || "Failed to upload image to Cloudinary");
  }
};

export const deleteFromCloudinary = async (
  publicId: string,
): Promise<DeleteResult> => {
  if (!publicId) {
    return {
      success: false,
      error: "publicId is required",
    };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    // Cloudinary returns { result: "ok" } or "not found"
    if (result?.result !== "ok") {
      return {
        success: false,
        error: "Cloudinary did not confirm deletion",
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Cloudinary Delete Error:", error);

    return {
      success: false,
      error: error?.message || "Cloudinary delete failed",
    };
  }
};