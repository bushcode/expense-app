import { ButtonHTMLAttributes, useState } from "react";
import Button from "./ui/button";
import { toast } from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";
import { Auth } from "firebase/auth";
import { useAuth } from "reactfire";
import { useNavigate } from "react-router-dom";

interface SignOutButtonInterface
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SignOutButton({ ...props }: SignOutButtonInterface) {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const auth = useAuth();

  const navigate = useNavigate();

  const signOut = async (auth: Auth) => {
    try {
      await auth.signOut();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("There was a problem signing out");
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => {
        setIsSigningOut(true);
        signOut(auth);
      }}
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
}
