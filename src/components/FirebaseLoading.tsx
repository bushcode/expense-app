import { Icons } from "./Icons";

type Props = {};

function FirebaseLoading({}: Props) {
  return (
    <div className="w-screen h-screen  flex justify-center items-center">
      <div className="items-center space-x-2 md:flex">
        <div className="rounded-lg h-8 w-8 flex justify-center items-center bg-slate-800">
          <Icons.Logo className="text-white w-8" />
        </div>

        <h1 className="text-xl text-slate-800 sm:inline-block hidden">
          <span className="font-bold">Dentsu</span>
          <span className="font-light">Finance</span>
        </h1>
      </div>
    </div>
  );
}

export default FirebaseLoading;
