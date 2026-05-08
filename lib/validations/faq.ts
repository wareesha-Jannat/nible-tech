import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(2, "Question is required"),
  answer: z.string().min(5, "Answer is required"),
});

export type FAQFormType = z.infer<typeof faqSchema>;
