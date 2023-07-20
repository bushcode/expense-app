import { z } from "zod";

export const createExpenseValidator = z.object({
  name: z.string().min(2),
  amount: z.number().min(1),
  budgetId: z.string(),
});
