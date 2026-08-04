import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  const location = useLocation();
  const shouldHideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-3 z-40 w-full px-10">
        <Navbar />
      </div>
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default PublicLayout;
