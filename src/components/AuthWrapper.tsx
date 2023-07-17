import { useNavigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { data: signInCheckResult } = useSigninCheck();
  const navigate = useNavigate();

  if (!children) {
    throw new Error("Children must be provided");
  }

  if (!signInCheckResult.signedIn) {
    navigate("/");
    return fallback;
  } else {
    return children as JSX.Element;
  }
};
