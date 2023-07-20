import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "./Icons";
import { MainNavItem } from "types";
import { cn } from "../lib/utils";
import SignOutButton from "../components/SignoutButton";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}
function Navbar({ items }: NavBarProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const segment = window.location.pathname.split("/")[1];

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <div className="rounded-lg h-8 w-8 flex justify-center items-center bg-slate-800">
          <Icons.Logo className="text-white w-8" />
        </div>

        <h1 className="text-xl text-slate-800 sm:inline-block hidden">
          <span className="font-bold">Dentsu</span>
          <span className="font-light">Finance</span>
        </h1>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
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
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.Logo />}
        <span className="font-bold">Menu</span>
      </button>
      {/* {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )} */}
    </div>
  );
}

export default Navbar;
