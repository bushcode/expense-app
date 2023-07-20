import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Expense } from "types";
import { initializeApp } from "firebase/app";
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export const getExpenses = async (budgetId: string) => {
//   const expensesCollection = collection(db, "expenses");
//   const expensesQuery = query(
//     expensesCollection,
//     where("budgetId", "==", budgetId)
//   );
//   let expenses: Expense[] = [];
//   const docSnap = await getDocs(expensesQuery);
//   docSnap.forEach((doc) => {
//     expenses.push(doc.data() as Expense);
//   });
//   return expenses;
// };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sumExpenses(expenses: Expense[]) {
  return expenses.reduce((acc, expense) => {
    return (acc += expense.amount);
  }, 0);
}

export function setProgress({ percentage }: { percentage: number }) {
  const background =
    percentage >= 40 && percentage <= 100
      ? "bg-green-500"
      : percentage >= 15 && percentage < 39
      ? "bg-orange-500"
      : "bg-red-600";

  return background;
}

export const sumBudgetExpenses = (budgetId: string, expenses: Expense[]) => {
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;
    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// export const sumBudgetExpenses = async (budgetId: string) => {
//   const expenses = await getExpenses(budgetId);

//   const budgetSpent = expenses.reduce((acc, expense) => {
//     // check if expense.id === budgetId I passed in
//     if (expense.budgetId !== budgetId) return acc;
//     // add the current amount to my total
//     return (acc += expense.amount);
//   }, 0);
//   return budgetSpent;
// };

export const calculateBudgetPercentageLeft = (
  totalBudget: number,
  spentAmount: number
): number => {
  const percentageLeft = ((totalBudget - spentAmount) / totalBudget) * 100;
  return percentageLeft;
};

export const formatCurrency = (amount: number | undefined) => {
  if (amount) {
    return new Intl.NumberFormat("en-US", {})
      .format(amount)
      .replace(/(\.|,)00$/g, "");
  }
  return 0;
};

export const convertTimestamp = (timestamp: Timestamp | null): string => {
  if (timestamp) {
    const date = timestamp.toDate();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

  return "";
};
