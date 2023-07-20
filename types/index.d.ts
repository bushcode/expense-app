import { Timestamp } from "firebase/firestore";
import { Icons } from "../src/components/Icons";

export interface NavItem {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
}

export type MainNavItem = NavItem;

export type DashboardConfig = {
  navLinks: NavItem[];
};

export type Budget = {
  id: string;
  name: string;
  amount: number;
  createdBy: string;
  expenses?: Expense[];
};

export type Expense = {
  id: string;
  createdBy: string;
  name: string;
  amount: number;
  budgetId: string;
  createdAt: Timestamp;
};
