import Button from "../components/ui/button";
import { Chrome } from "lucide-react";
import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup, Auth } from "firebase/auth";
import { Icons } from "../components/Icons";

function Login() {
  const auth = useAuth();

  const signInWithGoogle = async (auth: Auth) => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="relative items-center justify-center flex h-screen flex-col">
      <div className="h-full flex items-center justify-center container px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto w-full md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="relative rounded-xl bg-white shadow-xl">
            <div className="absolute h-full w-full">
              <div className="max-w-lg">
                <div className="animation-delay-2000 absolute right-0 top-10 w-10 h-10 md:h-32 md:w-32 animate-blob rounded-full bg-gray-600 mix-blend-multiply blur-2xl filter"></div>
              </div>
            </div>
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <div className="flex gap-1 items-center">
                  <div className="rounded-lg h-10 w-10 flex justify-center items-center bg-slate-800">
                    <Icons.Logo className="text-white w-10" />
                  </div>
                  <h1 className="text-2xl md:text-4xl text-slate-800">
                    <span className="font-bold">Dentsu</span>
                    <span className="font-light">Finance</span>
                  </h1>
                </div>

                <h2 className="mb-8 text-lg md:text-2xl text-slate-600 font-semibold">
                  Sign in to continue <br />
                </h2>
              </div>
              <div className="mt-8 grid space-y-4">
                <Button
                  variant="default"
                  className="relative flex gap-2 items-center justify-center"
                  onClick={() => signInWithGoogle(auth)}
                >
                  <Chrome />
                  Continue with Google
                </Button>

                {/* <Button
                  variant="outline"
                  className="relative flex gap-2 items-center justify-center"
                >
                  <Github />
                  Continue with Github
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
