import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },

      {
        path: "/signup",
        element: <Signup></Signup>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
