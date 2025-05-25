import { z } from "zod";
export const searchSchema = z
  .object({
    fromCity: z.string().min(1, "Origin city is required"),
    toCity: z.string().min(1, "Destination city is required"),
  })
  .refine((data) => data.fromCity !== data.toCity, {
    message: "Origin and destination cities cannot be the same",
    path: ["toCity"],
  });

export type SearchFormValues = z.infer<typeof searchSchema>;
