import { z } from "zod";

const featureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
export const baseServiceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  shortDescription: z.string().min(1).max(160),
  overview: z.string().min(1),

  category: z.enum(["seo", "web", "marketing"]),

  order: z.number().int().nonnegative(),
});

export const serviceFormSchema = baseServiceSchema.extend({
  features: z.array(featureSchema).min(1).max(6),

  technologies: z
    .array(
      z.object({
        value: z.string().min(1),
      }),
    )
    .min(1)
    .max(10),
});

export type ServiceFormType = z.infer<typeof serviceFormSchema>;

export const serviceBackendSchema = baseServiceSchema.extend({
  features: z.array(featureSchema).min(1).max(6),
  technologies: z.array(z.string()).min(1).max(10),
});
export type ServiceBackendType = z.infer<typeof serviceBackendSchema>;
