import { useEffect } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { Budget } from "../../types";
import { collection, orderBy, query, where } from "firebase/firestore";
import { BudgetContext } from "../context/budget-context";

interface BudgetProviderProps {
  children: React.ReactNode;
}
export default function BudgetProvider({ children }: BudgetProviderProps) {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const budgetCollection = collection(firestore, "budgets");

  const budgetQuery = query(
    budgetCollection,
    where("createdBy", "==", user!.uid),
    orderBy("createdAt", "desc")
  );

  const { data: budgets } = useFirestoreCollectionData(budgetQuery, {
    idField: "id",
  });

  const budgetData = budgets as Budget[];

  useEffect(() => {}, [budgetData]);

  return (
    <BudgetContext.Provider value={{ budgets: budgetData }}>
      {children}
    </BudgetContext.Provider>
  );
}
