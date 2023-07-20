import { SuspenseWithPerf } from "reactfire";
import { EmptyState } from "../components/EmptyState";
import { Suspense, lazy } from "react";
import ExpensesTable from "@/components/ExpensesTable";
import BudgetList from "@/components/BudgetList";
import { useBudgetContext } from "@/context/budget-context";
import { useExpenseContext } from "@/context/expenses-context";

//lazy load the CreateBudgetButton and CreateExpenseButton components

const CreateExpenseButton = lazy(
  () => import("@/components/CreateExpenseButton")
);

type Props = {};

export default function Home({}: Props) {
  const { budgets } = useBudgetContext();
  const { expenses } = useExpenseContext();
  const dashboardBudgets = budgets.slice(0, 6);
  const dashboardExpenses = expenses.slice(0, 6);
  return (
    <div className="grid items-start gap-8">
      <SuspenseWithPerf
        fallback="connecting to Firestore..."
        traceId="firestore-demo-root"
      >
        <BudgetList budgets={dashboardBudgets} header="Recent Budgets" />
        {budgets.length ? (
          <div>
            <div className="flex align-center justify-between">
              <h1 className="font-bold text-3xl md:text-4xl mb-8 text-slate-900">
                Recent Expenses
              </h1>
              <CreateExpenseButton
                variant="default"
                className="mr-1"
                size="sm"
                budgets={budgets}
              />
            </div>

            {expenses.length ? (
              <Suspense fallback="connecting to Firestore...">
                <ExpensesTable
                  expenses={dashboardExpenses}
                  tableCaption="A list of your recent expenses."
                />
              </Suspense>
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
      </SuspenseWithPerf>
    </div>
  );
}
