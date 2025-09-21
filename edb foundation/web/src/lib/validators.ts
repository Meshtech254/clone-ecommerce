import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please write at least 10 characters").max(2000),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

