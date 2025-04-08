import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const AuthAdminOnlyLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (user.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthAdminOnlyLayout;