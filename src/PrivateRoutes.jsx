import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./hooks/user-auth";
import AuthLayout from "./layout/AuthLayout";
import ReactLoading from 'react-loading';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoutes({ children, ...rest }) {
  const auth = useAuth();

  if (auth.loadingUser) {
    return <div style={{
      minHeight: '100vh'
    }} className="flex items-center	justify-center m-5 flex-col	"><ReactLoading className="b-1" type={'bars'} color={'gray'} height={150} width={150} /></div>;
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
