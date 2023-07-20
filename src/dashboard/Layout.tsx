import { useUser } from "reactfire";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { dashboardConfig } from "../configs/dashboard";
import Sidebar from "../components/Sidebar";
import SignOutButton from "../components/SignoutButton";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {}

export default function DashboardLayout({}: DashboardLayoutProps) {
  const { data: user } = useUser();
  // console.log(user);

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Navbar items={dashboardConfig.mainNav} />
          {/* <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          /> */}
          <SignOutButton />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <Sidebar items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
}
