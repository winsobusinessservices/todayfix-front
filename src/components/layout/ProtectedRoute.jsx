import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUserStore } from "../../store/userStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const userData = useUserStore((state) => state.user);

  const isAuthenticated =
    useUserStore((state) => state.isAuthenticated) || userData?.isAuthenticated;
  const userRole = userData?.role;
  const businessStatus = userData?.businessStatus;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === "USER") {
      return <Navigate to="/list-business" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (userRole === "OWNER") {
    if (
      businessStatus === "VERIFY" &&
      location.pathname !== "/list-business/documents"
    ) {
      return <Navigate to="/list-business/documents" replace />;
    }

    if (
      businessStatus === "PENDING" &&
      location.pathname !== "/verification-pending"
    ) {
      return <Navigate to="/verification-pending" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
