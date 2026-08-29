import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  const location = useLocation();
  const shouldHideFooter = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/otp",
    "/verification-pending"
  ].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-3 z-40 w-full px-10">
        <Navbar />
      </div>
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      {/* {!shouldHideFooter && <Footer />} */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
