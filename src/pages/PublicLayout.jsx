import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-5 z-40 w-full px-10">
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
