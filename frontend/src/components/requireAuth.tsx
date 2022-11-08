import React from "react";
import { Roles } from "../auth";
import { ProtectedRoute } from "./ProtectedRoute";

export const requireAuth = (
  element: React.ReactElement,
  roles: Roles | Roles[] = Roles.player
) => {
  return <ProtectedRoute roles={roles}>{element}</ProtectedRoute>;
};
