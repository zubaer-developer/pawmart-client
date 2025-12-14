import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const RootLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg font-semibold">Loading Application...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pt-5">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
