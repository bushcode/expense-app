import { useEffect } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

import { Expense } from "../../types";
import { collection, orderBy, query, where } from "firebase/firestore";
import { ExpenseContext } from "@/context/expenses-context";

interface ExpenseProviderProps {
  children: React.ReactNode;
}

export default function ExpenseProvider({ children }: ExpenseProviderProps) {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const expensesCollection = collection(firestore, "expenses");
  const expensesQuery = query(
    expensesCollection,
    where("createdBy", "==", user!.uid),
    orderBy("createdAt", "desc")
  );
  const { data: expenses } = useFirestoreCollectionData(expensesQuery, {
    idField: "id",
  });

  const expensesData = expenses as Expense[];

  useEffect(() => {}, [expensesData]);

  return (
    <ExpenseContext.Provider value={{ expenses: expensesData }}>
      {children}
    </ExpenseContext.Provider>
  );
}
