import { createContext, useContext } from "react";
import { Expense } from "../../types";

interface ExpenseContextProps {
  expenses: Expense[];
}

export const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined
);

export const useExpenseContext = (): ExpenseContextProps => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within a ExpenseProvider");
  }
  return context;
};
