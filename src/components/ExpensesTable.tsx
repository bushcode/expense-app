import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button, { ButtonVariants } from "./ui/button";
import { Icons } from "./Icons";
import { Expense } from "types";
import { cn, convertTimestamp, formatCurrency } from "@/lib/utils";
import { useBudgetContext } from "@/context/budget-context";
import DeleteExpenseButton from "./DeleteExpense";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useToast } from "./ui/use-toast";

interface ExpenseTableProps {
  expenses: Expense[];
  tableCaption: string;
}

function ExpensesTable({ expenses, tableCaption }: ExpenseTableProps) {
  const { budgets } = useBudgetContext();
  const [open, setOpen] = useState<boolean>(false);
  const [expenseId, setExpenseId] = useState<string>("");
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  function getBudgetName(budgetId: string): string | undefined {
    const matchingBudget = budgets.find((budget) => budget.id === budgetId);
    return matchingBudget ? matchingBudget.name : undefined;
  }

  function handleDeleteExpense(id: string) {
    setExpenseId(id);
    setOpen(!open);
  }

  const deleteExpense = async (expenseId: string) => {
    const firestore = getFirestore();
    const expenseRef = doc(firestore, "expenses", expenseId);

    try {
      setIsDeleteLoading(true);
      await deleteDoc(expenseRef);
      setIsDeleteLoading(false);
      toast({
        title: "Success",
        description: "Expense successfully deleted.",
      });
      setOpen(false);
    } catch (error) {
      setIsDeleteLoading(false);
      toast({
        title: "Error",
        description: "Error deleting expense. Please try again.",
      });
    }
  };

  return (
    <Table>
      <TableCaption>{tableCaption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense, index) => (
          <>
            <TableRow key={expense.id} className="text-slate-800">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>${formatCurrency(expense.amount)}</TableCell>
              <TableCell>{convertTimestamp(expense?.createdAt)}</TableCell>
              <TableCell>
                <div
                  className={cn(
                    ButtonVariants({ variant: "ghost", size: "sm" })
                  )}
                >
                  {getBudgetName(expense.budgetId)}
                </div>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <Icons.trash className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
            <DeleteExpenseButton
              openDialog={open}
              setOpenDialog={setOpen}
              onDelete={() => deleteExpense(expenseId)}
              isDeleting={isDeleteLoading}
            />
          </>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExpensesTable;
