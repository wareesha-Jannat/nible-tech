// /lib/validations/service.ts
import { features } from "process";
import { z } from "zod";

const baseServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  category: z.string(),
  featured: z.boolean(),
});

export const serviceFormSchema =  baseServiceSchema.extend({
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

export type ServiceFormType = z.infer<typeof serviceFormSchema>;

export const serviceBackendSchema = serviceFormSchema.extend({
    features: z.array(z.string()).max(4),
    technologies: z.array(z.string()).max(6),
});

export type ServiceBackendType = z.infer<typeof serviceBackendSchema>;
