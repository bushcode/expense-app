import { createContext, useContext } from "react";
import { Budget } from "../../types";

interface BudgetContextProps {
  budgets: Budget[];
}

export const BudgetContext = createContext<BudgetContextProps | undefined>(
  undefined
);

export const useBudgetContext = (): BudgetContextProps => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgetContext must be used within a BudgetProvider");
  }
  return context;
};
