import { SuspenseWithPerf } from "reactfire";
import BudgetList from "@/components/BudgetList";
import BudgetLoading from "@/components/BudgetLoading";
import ExpenseLoading from "@/components/ExpenseLoading";
import ExpenseList from "@/components/ExpenseList";
import { useBudgetContext } from "@/context/budget-context";

export default function Home() {
  const { budgets } = useBudgetContext();
  const dashboardBudgets = budgets.slice(0, 6);
  return (
    <div>
      <SuspenseWithPerf
        fallback={<BudgetLoading />}
        traceId="firestore-demo-root"
      >
        <BudgetList budgets={dashboardBudgets} header="Recent Budgets" />
      </SuspenseWithPerf>

      <SuspenseWithPerf
        fallback={<ExpenseLoading />}
        traceId="firestore-demo-root"
      >
        <ExpenseList header="Expenses" />
      </SuspenseWithPerf>
    </div>
  );
}
