import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ManagerRoutes({ children }) {
  let { user } = useAuthContext();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  console.log(user);
  if (!user.isManager) {
    return <Navigate to={"/user-dashboard"} />;
  }

  return children;
}

export default ManagerRoutes;
