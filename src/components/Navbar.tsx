import { Link } from "react-router-dom";
import { Icons } from "./Icons";
import { MainNavItem } from "types";
import { cn } from "@/lib/utils";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

function Navbar({ items }: NavBarProps) {
  const segment = window.location.pathname.split("/")[1];
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link to="/" className="items-center space-x-2 flex">
        <div className="rounded-lg h-8 w-8 flex justify-center items-center bg-slate-800">
          <Icons.Logo className="text-white w-8" />
        </div>

        <h1 className="hidden sm:text-xl text-slate-800 sm:inline-block">
          <span className="font-bold">Dentsu</span>
          <span className="font-light">Finance</span>
        </h1>
      </Link>
      {items?.length ? (
        <nav className="flex gap-3 md:hidden">
          {items?.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center text-sm transition-colors hover:text-foreground/80 ",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

export default Navbar;
