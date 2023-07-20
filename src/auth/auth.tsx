import { AuthWrapper } from "../components/AuthWrapper";
import Login from "./login";
import Dashboard from "../dashboard/Layout";

export const Auth = () => {
  return (
    <AuthWrapper fallback={<Login />}>
      <Dashboard />
    </AuthWrapper>
  );
};
