import React from "react";
import { NavLink } from "react-router";
import ErrorImage from "../assets/error-page.jpg";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* page title */}
      <title>Error-Page</title>
      <div>
        <div className="flex justify-center mt-2 text-xl p-3">
          <NavLink
            to={"/"}
            className=" flex justify-center py-3 px-4 rounded-sm bg-[linear-gradient(125.07deg,rgba(99,46,227,1),rgba(159,98,242,1)_100%)] text-white font-bold cursor-pointer"
          >
            Go Back Home!
          </NavLink>
        </div>
        <img className=" w-full h-dvh" src={ErrorImage} alt="" />
      </div>
    </div>
  );
};

export default ErrorPage;
