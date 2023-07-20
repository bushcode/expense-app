import React, { useEffect } from "react";
import { Icons } from "./Icons";
import { Budget } from "types";
import {
  calculateBudgetPercentageLeft,
  cn,
  formatCurrency,
  setProgress,
  sumBudgetExpenses,
} from "@/lib/utils";
import { Link } from "react-router-dom";
import { useExpenseContext } from "@/context/expenses-context";

interface BudgetCardProps {
  budget: Budget;
  budgets: Budget[];
}

//TODO: color code progress bar and amount remaining

function BudgetCard({ budget, budgets }: BudgetCardProps) {
  const { expenses } = useExpenseContext();
  const [totalSpent, setTotalSpent] = React.useState<number>(0);
  const [totalRemaining, setTotalRemaining] = React.useState<number>(0);
  const { id: budgetId } = budget;

  const matchingBudget = budgets.find((budget) => budget.id === budgetId);

  useEffect(() => {
    const spent = sumBudgetExpenses(matchingBudget?.id, expenses);
    const budgetBalance = budget.amount - spent;
    setTotalSpent(spent);
    setTotalRemaining(budgetBalance);
  });

  const percentageLeft = calculateBudgetPercentageLeft(
    budget.amount,
    totalSpent
  );

  return (
    <Link
      to={`/app/budgets/${budget.id}`}
      className="relative overflow-hidden rounded-lg border cursor-pointer hover:bg-zinc-100 transition-all duration-100 ease-out hover:ease-in"
    >
      <div className="flex h-full flex-col rounded-md">
        <div className="px-2 py-4">
          <h3 className="font-semibold text-lg text-slate-900">
            {budget.name}
          </h3>

          {percentageLeft <= 15 ? (
            <div className="flex gap-1 items-center my-1">
              <Icons.alert className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-red-500">
                Your budget is down to {Math.floor(percentageLeft)}%
              </span>
            </div>
          ) : (
            <div>
              <span className="text-xs text-slate-600">Your budget limit</span>
              <br />
            </div>
          )}

          <h3 className="text-2xl text-slate-900">
            ${formatCurrency(budget.amount)}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div
              style={{ width: `${percentageLeft}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-100 ease-out hover:ease-in",
                setProgress({ percentage: percentageLeft })
              )}
            ></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-500">
              ${formatCurrency(totalSpent)} spent
            </span>
            <span className="text-xs text-slate-500">
              ${formatCurrency(totalRemaining)} remaining
            </span>
          </div>
          {/* <div className="flex justify-end">
            <Button variant="default" size="sm">
              <Icons.eye className="w-5 h-5" />
            </Button>
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default BudgetCard;
