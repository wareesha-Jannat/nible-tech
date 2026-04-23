import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select an estimated budget"),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactFormType = z.infer<typeof contactSchema>;
