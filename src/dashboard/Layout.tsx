import { useUser } from "reactfire";
import { Link, Outlet } from "react-router-dom";
import { Icons } from "../components/Icons";
import { SidebarOption } from "../../types/typings";
import SignOutButton from "../components/SignoutButton";

interface DashboardLayoutProps {
  // children: ReactNode;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/app/add",
    Icon: "UserPlus",
  },
];

export default function DashboardLayout({}: DashboardLayoutProps) {
  const { data: user } = useUser();
  // console.log(user);

  return (
    <div className="w-full flex h-screen">
      <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link to="/app" className="h-16 flex gap-1 items-center">
          <div className="rounded-lg h-8 w-8 flex justify-center items-center bg-slate-800">
            <Icons.Logo className="text-white w-8" />
          </div>
          <h1 className="text-2xl text-slate-800">
            <span className="font-bold">Dentsu</span>
            <span className="font-light">Chat</span>
          </h1>
        </Link>

        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
          <p className="text-xs font-semibold leading-6 text-slate-600">
            You have not added any friends.
          </p>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon as keyof typeof Icons];
                  return (
                    <li key={option.id}>
                      <Link
                        to={option.href}
                        className="text-gray-700 hover:text-slate-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-slate-600 group-hover:text-slate-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}

                {/* <li>
                  <FriendRequestSidebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li> */}
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <img
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={user!.photoURL || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{user?.displayName}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {user?.email}
                  </span>
                </div>
              </div>

              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      <aside className="max-h-screen container py-16 md:py-12 w-full">
        <Outlet />
      </aside>
    </div>
  );
}
