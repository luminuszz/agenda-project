import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@/store/auth.ts";
import { Navigate, Outlet } from "react-router";
import React, { PropsWithChildren } from "react";

export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (isAuthenticated) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/login" replace />;
};
