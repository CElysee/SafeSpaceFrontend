import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../features/auth/authSlice";

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default PrivateRoutes;