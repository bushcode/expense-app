import { Timestamp } from "firebase/firestore";
import { Icons } from "../src/components/Icons";

export interface NavItem {
  title: string;
  href: string;
}

export type SidebarNavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
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
