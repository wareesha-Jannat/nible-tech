import z from "zod";


export const statSchema = z.object({

  value: z.number().min(1, "Value must be greater than 0"),
  suffix: z.string().max(2, "Too long"),
  label: z.string().min(1, "Label is required"),
});

export type StatInput = z.infer<typeof statSchema>;