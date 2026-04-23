import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  message: z.string().min(5, "Message is required"),
  featured: z.boolean(),
});

export type TestimonialFormType = z.infer<typeof testimonialSchema>;
