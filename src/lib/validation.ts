import { z } from "zod";

export const leadIntakeSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  company: z.string().trim().optional(),
  website: z.string().trim().min(3, "Enter a website").optional(),
  niche: z.string().trim().optional(),
  revenue: z.number().int().min(0, "Revenue must be positive").optional(),
  budget: z.number().int().min(0, "Budget must be positive").optional(),
  mainPain: z.enum(["leads", "ops", "time"]).optional(),
  goal: z.string().trim().optional(),
  timeframe: z.enum(["now", "30d", "60d+"], {
    required_error: "Select a timeframe",
  }),
  source: z.string().trim().optional(),
});

export type LeadIntakeInput = z.infer<typeof leadIntakeSchema>;
