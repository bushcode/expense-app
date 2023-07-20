import { Skeleton } from "./ui/skeleton";

type Props = {};

function BudgetLoading({}: Props) {
  return (
    <div className="w-full h-full">
      <div className="flex align-center justify-between">
        <h1 className="font-bold text-3xl md:text-4xl mb-8 text-slate-900">
          <Skeleton className="h-10 w-[250px]" />
        </h1>
        <div>
          <Skeleton className="h-10 w-[170px]" />
        </div>
      </div>

      <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[68rem] md:grid-cols-3 grid-cols-1">
        <Skeleton className="h-36 w-[22rem] rounded-lg" />
        <Skeleton className="h-36 w-[22rem] rounded-lg" />
        <Skeleton className="h-36 w-[22rem] rounded-lg" />
      </div>
    </div>
  );
}

export default BudgetLoading;
