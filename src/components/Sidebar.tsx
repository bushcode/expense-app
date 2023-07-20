import { SidebarNavItem } from "../../types";
import { cn } from "../lib/utils";
import { Icons } from "../components/Icons";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  items: SidebarNavItem[];
}

function Sidebar({ items }: SidebarProps) {
  const location = useLocation();
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} to={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-accent-foreground",
                  location.pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}

export default Sidebar;
