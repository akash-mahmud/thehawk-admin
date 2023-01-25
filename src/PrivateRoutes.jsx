import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./hooks/user-auth";
import AuthLayout from "./layout/AuthLayout";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoutes({ children, ...rest }) {
  const auth = useAuth();

  if (auth.loadingUser) {
    return <p>Loading</p>;
  }

  return (
    <>
      {auth.user && !auth.loadingUser ? (
        <>
          <AuthLayout>
            <Outlet />
          </AuthLayout>
       
        </>
      ) : (
        <Navigate to="/admin/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
