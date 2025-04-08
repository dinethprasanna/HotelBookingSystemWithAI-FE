import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const AuthUserOnlyLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default AuthUserOnlyLayout;