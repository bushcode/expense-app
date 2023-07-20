// import CreateBudgetButton from "./CreateBudgetButton";
import BudgetCard from "./BudgetCard";
import { EmptyState } from "./EmptyState";
import { lazy } from "react";
import { useBudgetContext } from "@/context/budget-context";

interface BudgetListProps {
  header: string;
}

const CreateBudgetButton = lazy(
  () => import("@/components/CreateBudgetButton")
);

export default function BudgetList({ header }: BudgetListProps) {
  const { budgets } = useBudgetContext();
  return (
    <>
      <div className="py-2">
        <div className="flex align-center justify-between">
          <h1 className="font-bold text-3xl md:text-4xl mb-8 text-slate-900">
            {header}
          </h1>
          <CreateBudgetButton variant="default" className="mr-1" size="sm" />
        </div>

        {budgets.length ? (
          <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[68rem] md:grid-cols-3 grid-cols-1">
            {budgets.map((budget) => (
              <BudgetCard budgets={budgets} budget={budget} key={budget.id} />
            ))}
          </div>
        ) : (
          <EmptyState>
            <EmptyState.Icon name="wallet" className="text-slate-800" />
            <EmptyState.Title>
              You haven't created any budgets.
            </EmptyState.Title>
            <EmptyState.Description>
              Start planning your funds. Create a budget.
              <CreateBudgetButton
                variant="outline"
                className="mt-3"
                size="sm"
              />
            </EmptyState.Description>
          </EmptyState>
        )}
      </div>
    </>
  );
}
