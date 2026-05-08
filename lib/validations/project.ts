import { z } from "zod";

export const baseProjectSchema = z.object({
  title: z.string().min(2, "Name is required"),
  description: z.string().min(2, "Role is required"),
  demoUrl : z.string().optional(),
});

export const projectFormSchema = baseProjectSchema.extend({
  features: z
    .array(
      z.object({
        value: z.string().min(1, "Feature cannot be empty"),
      }),
    )
    .max(4),
  technologies: z
    .array(
      z.object({
        value: z.string().min(1, "Technology cannot be empty"),
      }),
    )
    .max(6),
});

export type ProjectFormType = z.infer<typeof projectFormSchema>;

export const projectBackendSchema = projectFormSchema.extend({
  technologies: z.array(z.string()).max(6),
  features: z.array(z.string()).max(4),
});

export type ProjectBackendType = z.infer<typeof projectBackendSchema>;
