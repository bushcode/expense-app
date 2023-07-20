import BudgetList from "@/components/BudgetList";
import { useBudgetContext } from "@/context/budget-context";

type Props = {};

export default function Budgets({}: Props) {
  const { budgets } = useBudgetContext();
  return (
    <div className="grid items-start gap-8">
      <BudgetList budgets={budgets} header="Your Budgets" />
    </div>
  );
}
