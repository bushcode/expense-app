import CreateExpenseButton from "./CreateExpenseButton";
import { useExpenseContext } from "@/context/expenses-context";
import { useBudgetContext } from "@/context/budget-context";
import ExpensesTable from "./ExpensesTable";
import { EmptyState } from "./EmptyState";

interface ExpenseListProps {
  header: string;
}

function ExpenseList({ header }: ExpenseListProps) {
  const { expenses } = useExpenseContext();
  const { budgets } = useBudgetContext();
  const dashboardExpenses = expenses.slice(0, 6);

  return (
    <div className="overflow-x-auto">
      {budgets.length ? (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-xl md:text-4xl text-slate-900">
              {header}
            </h1>
            <CreateExpenseButton
              variant="default"
              size="sm"
              budgets={budgets}
            />
          </div>

          {expenses.length ? (
            <ExpensesTable
              expenses={dashboardExpenses}
              tableCaption="A list of your recent expenses."
            />
          ) : (
            <EmptyState>
              <EmptyState.Icon name="banknote" className="text-slate-800" />
              <EmptyState.Title>No expenses added</EmptyState.Title>
              <EmptyState.Description>
                You haven&apos;t added any expenses to your budgets.
              </EmptyState.Description>
            </EmptyState>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ExpenseList;
