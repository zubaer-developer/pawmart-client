import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
