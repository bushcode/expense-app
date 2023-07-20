import { useUser } from "reactfire";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { dashboardConfig } from "../configs/dashboard";
import Sidebar from "../components/Sidebar";
import SignOutButton from "../components/SignoutButton";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout() {
  const { data: user } = useUser();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Navbar />

          <div className="flex gap-2 items-center">
            <div className="border rounded-lg pr-2 h-9 flex gap-2 items-center">
              {user?.photoURL ? (
                <img
                  src={user?.photoURL as string}
                  alt={user?.displayName as string}
                  className="rounded-lg h-8 w-8"
                />
              ) : null}

              <span className="text-slate-600 text-sm">
                {user?.displayName}
              </span>
            </div>
            <SignOutButton />
          </div>
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
