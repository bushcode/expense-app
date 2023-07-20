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
    <div className="flex min-h-screen max-w-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Navbar items={dashboardConfig.navLinks} />

          <div className="flex gap-2 items-center">
            <div className="sm:flex border rounded-lg  h-9 sm:w-auto  flex gap-2 items-center">
              {user?.photoURL ? (
                <div className="w-9 h-9">
                  <img
                    src={user?.photoURL as string}
                    alt={user?.displayName as string}
                    className="rounded-lg object-fill w-full h-full"
                  />
                </div>
              ) : null}

              <span className="text-slate-600 hidden sm:inline-block text-sm pr-2">
                {user?.displayName}
              </span>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>
      <div className="container flex gap-6">
        <aside className="hidden w-[200px] flex-col md:flex">
          <Sidebar items={dashboardConfig.navLinks} />
        </aside>
        <main className="flex w-full flex-1 flex-col">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
}
