import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../pages/AddListing";
import RootLayout from "../layouts/RootLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
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

      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
