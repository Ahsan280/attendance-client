import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoutes({ children }) {
  let { user } = useAuthContext();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
}

export default ProtectedRoutes;
