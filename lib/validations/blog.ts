import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title is too short"),

  excerpt: z
    .string()
    .min(10, "Excerpt is too short")
    .max(300, "Excerpt is too long"),

  content: z.string().min(10, "Content cannot be empty"),
});

export type BlogFormType = z.infer<typeof blogSchema>;
