import BudgetList from "@/components/BudgetList";
import { useBudgetContext } from "@/context/budget-context";

export default function Budgets() {
  const { budgets } = useBudgetContext();
  return (
    <div className="grid items-start gap-8">
      <BudgetList budgets={budgets} header="Your Budgets" />
    </div>
  );
}
