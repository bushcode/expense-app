import BudgetList from "@/components/BudgetList";

export default function Budgets() {
  return (
    <div className="grid items-start gap-8">
      <BudgetList header="Your Budgets" />
    </div>
  );
}
