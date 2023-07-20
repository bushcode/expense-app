import { useSigninCheck } from "reactfire";

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!children) {
    throw new Error("Children must be provided");
  }

  if (status === "loading") {
    return <span>loading...</span>;
  }

  if (!signInCheckResult.signedIn) {
    // console.log("running...");
    if (window.location.pathname !== "/") {
      window.location.assign("/");
    }
    return fallback;
  } else {
    return children as JSX.Element;
  }
};
