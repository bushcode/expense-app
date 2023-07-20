import BudgetList from "@/components/BudgetList";
import { useBudgetContext } from "@/context/budget-context";

export default function Budgets() {
  const { budgets } = useBudgetContext();
  return (
    <>
      <BudgetList budgets={budgets} header="Budgets" />
    </>
  );
}
