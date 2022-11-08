import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Roles } from "../auth";

export const ProtectedRoute = ({
  children,
  roles,
}: {
  roles: Roles | Roles[];
  children: ReactElement;
}) => {
  const { user } = useAuth();

  if (
    user === null ||
    (roles instanceof Array ? roles.includes(user.role) : user.role < roles)
  ) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children ?? <div></div>;
};
