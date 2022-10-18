import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Roles } from "../auth";
import { ProtectedRoute } from "./ProtectedRoute";

export const requireAuth = (
  element: React.ReactElement,
  roles: Roles | Roles[]
) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <ProtectedRoute roles={roles}>{element}</ProtectedRoute>;
};
