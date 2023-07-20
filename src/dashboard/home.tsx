import { SuspenseWithPerf } from "reactfire";
import BudgetList from "@/components/BudgetList";
import BudgetLoading from "@/components/BudgetLoading";
import ExpenseLoading from "@/components/ExpenseLoading";
import ExpenseList from "@/components/ExpenseList";

export default function Home() {
  return (
    <div className="grid items-start gap-8">
      <SuspenseWithPerf
        fallback={<BudgetLoading />}
        traceId="firestore-demo-root"
      >
        <BudgetList header="Recent Budgets" />
      </SuspenseWithPerf>

      <SuspenseWithPerf
        fallback={<ExpenseLoading />}
        traceId="firestore-demo-root"
      >
        <ExpenseList header="Recent Expenses" />
      </SuspenseWithPerf>
    </div>
  );
}
