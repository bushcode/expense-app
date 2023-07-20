import { Link } from "react-router-dom";
import { Icons } from "./Icons";

function Navbar() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="items-center space-x-2 flex">
        <div className="rounded-lg h-8 w-8 flex justify-center items-center bg-slate-800">
          <Icons.Logo className="text-white w-8" />
        </div>

        <h1 className="text-xl text-slate-800 sm:inline-block">
          <span className="font-bold">Dentsu</span>
          <span className="font-light">Finance</span>
        </h1>
      </Link>
    </div>
  );
}

export default Navbar;
