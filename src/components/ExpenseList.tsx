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
    <>
      {budgets.length ? (
        <div>
          <div className="flex align-center justify-between">
            <h1 className="font-bold text-3xl md:text-4xl mb-8 text-slate-900">
              {header}
            </h1>
            <CreateExpenseButton
              variant="default"
              className="mr-1"
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
    </>
  );
}

export default ExpenseList;
