import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUserStore } from "../../store/userStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const userData = useUserStore((state) => state.user);
  console.log(userData);
  

  const isAuthenticated =
    useUserStore((state) => state.isAuthenticated) || userData?.isAuthenticated;
  const userRole = userData?.role;
  
  // New boolean fields for business status
  const hasBusiness = userData?.hasBusiness === true;
  const businessVerified = userData?.businessVerified === true;
  
  // Legacy status (fallback)
  const businessStatus = userData?.businessStatus;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- Business Onboarding Flow Enforcement ---
  const isListingRoute = 
    location.pathname === "/list-business" || 
    location.pathname === "/list-business/documents";
  
  if (isListingRoute && hasBusiness) {
    if (businessVerified) {
      return <Navigate to="/owner-dashboard" replace />;
    } else {
      return <Navigate to="/verification-pending" replace />;
    }
  }

  if (location.pathname === "/verification-pending") {
    if (businessVerified) {
      return <Navigate to="/owner-dashboard" replace />;
    }
    // If they don't have a business at all, they shouldn't be in pending
    if (!hasBusiness && businessStatus !== "PENDING") {
      return <Navigate to="/list-business" replace />;
    }
  }

  // --- Role & Permission Enforcement ---
  // If the user's business is verified, we grant them access to BUSINESS/OWNER routes
  // even if the backend hasn't updated their role token to "BUSINESS" yet.
  const isBusinessRoute = allowedRoles && (allowedRoles.includes("BUSINESS") || allowedRoles.includes("OWNER"));
  
  const hasAccess = allowedRoles 
    ? allowedRoles.includes(userRole) || (isBusinessRoute && businessVerified)
    : true;

  if (!hasAccess) {
    if (userRole === "USER") {
      if (hasBusiness && !businessVerified) {
        return <Navigate to="/verification-pending" replace />;
      }
      return <Navigate to="/list-business" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // --- Legacy Fallbacks (for older user objects) ---
  if (userRole === "OWNER" || userRole === "BUSINESS") {
    if (
      businessStatus === "VERIFY" &&
      location.pathname !== "/list-business/documents" &&
      !hasBusiness
    ) {
      return <Navigate to="/list-business/documents" replace />;
    }

    if (
      businessStatus === "PENDING" &&
      location.pathname !== "/verification-pending" &&
      !hasBusiness
    ) {
      return <Navigate to="/verification-pending" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
