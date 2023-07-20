import CreateExpenseButton from "@/components/CreateExpenseButton";
import { EmptyState } from "@/components/EmptyState";
import ExpensesTable from "@/components/ExpensesTable";
import { Icons } from "@/components/Icons";
import { ButtonVariants } from "@/components/ui/button";
import { useBudgetContext } from "@/context/budget-context";
import { useExpenseContext } from "@/context/expenses-context";
import {
  calculateBudgetPercentageLeft,
  cn,
  formatCurrency,
  setProgress,
  sumExpenses,
} from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

function BudgetOverview() {
  const { expenses } = useExpenseContext();
  const { budgets } = useBudgetContext();
  let { budgetId } = useParams();

  const selectionBudget = budgets.filter((budget) => budget.id === budgetId);
  const matchingBudget = budgets.find((budget) => budget.id === budgetId);

  const matchingExpenses = expenses.filter(
    (expense) => expense.budgetId === budgetId
  );

  //sum expenses for budget
  let totalSpent = sumExpenses(matchingExpenses);
  const budgetBalance = matchingBudget!.amount - totalSpent;

  const percentageLeft = calculateBudgetPercentageLeft(
    matchingBudget!.amount,
    totalSpent
  );

  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      <div className="flex w-full items-center">
        <div className="flex items-center space-x-10">
          <Link to="/app" className={cn(ButtonVariants({ variant: "ghost" }))}>
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:max-w-lg">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">
          {matchingBudget?.name}
        </h1>
        <div>
          <span className="text-sm text-slate-600">Budget Limit</span>
          <h3 className="text-3xl lg:text-5xl font-bold text-slate-800">
            ${formatCurrency(matchingBudget?.amount)}
          </h3>
        </div>
        <div className="flex gap-4">
          <div>
            <span className="text-sm text-slate-600">Total Spent</span>
            <h3 className="text-2xl font-bold text-slate-800">
              ${formatCurrency(totalSpent)}
            </h3>
          </div>

          <div>
            <span className="text-sm text-slate-600">Budget Balance</span>
            <h3 className="text-2xl font-bold text-slate-800">
              ${formatCurrency(budgetBalance)}
            </h3>
          </div>
        </div>
        <>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div
              style={{ width: `${percentageLeft}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-100 ease-out hover:ease-in",
                setProgress({ percentage: percentageLeft })
              )}
            ></div>
          </div>

          {percentageLeft >= 0 ? (
            <span className="text-xs text-slate-600 -mt-2">
              {Math.floor(percentageLeft)}% of total budget limit remaining.
            </span>
          ) : (
            <span className="text-xs text-red-600 -mt-2">
              {Math.floor(percentageLeft)}% deficit.
            </span>
          )}
          <CreateExpenseButton
            variant="ghost"
            budgets={selectionBudget}
            size="default"
          />
        </>
      </div>

      {matchingExpenses.length ? (
        <>
          <div className="flex justify-between items-center -mb-6">
            <h1 className="font-bold text-2xl md:text-4xl text-slate-900">
              Expenses
            </h1>
          </div>
          <ExpensesTable
            expenses={matchingExpenses}
            tableCaption={`A list of expenses for ${matchingBudget?.name}.`}
          />
        </>
      ) : (
        <EmptyState>
          <EmptyState.Icon name="banknote" className="text-slate-800" />
          <EmptyState.Title>No expenses</EmptyState.Title>
          <EmptyState.Description>
            You haven&apos;t added any expenses to this budget.
          </EmptyState.Description>
        </EmptyState>
      )}
    </div>
  );
}

export default BudgetOverview;
