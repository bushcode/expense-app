import { Loader } from "lucide-react";
import { SuspenseWithPerf } from "reactfire";
import { AuthWrapper } from "../components/AuthWrapper";
import Login from "./login";
import Dashboard from "../dashboard/Layout";

export const Auth = () => {
  return (
    <SuspenseWithPerf traceId={"firebase-user-wait"} fallback={<Loader />}>
      <AuthWrapper fallback={<Login />}>
        <Dashboard />
      </AuthWrapper>
    </SuspenseWithPerf>
  );
};
