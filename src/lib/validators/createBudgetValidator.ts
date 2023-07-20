import { z } from "zod";

export const createBudgetValidator = z.object({
  name: z.string().min(2),
  amount: z.number().min(1),
});
