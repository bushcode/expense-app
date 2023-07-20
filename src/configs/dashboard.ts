import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Home",
      href: "/app",
      icon: "home",
    },
    {
      title: "Budgets",
      href: "/app/budgets",
      icon: "wallet",
    },
  ],
};
