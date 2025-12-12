import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
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
