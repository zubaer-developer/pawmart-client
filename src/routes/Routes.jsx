import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../pages/AddListing";
import RootLayout from "../layouts/RootLayout";
import PetsSupplies from "../pages/PetsSupplies";
import MyListings from "../pages/MyListings";
import UpdateListing from "../pages/UpdateListing";
import ListingDetails from "../pages/ListingDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
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

      {
        path: "/pets-supplies",
        element: <PetsSupplies />,
      },

      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },

      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateListing />
          </PrivateRoute>
        ),
      },

      {
        path: "/listing/:id",
        element: <ListingDetails />,
      },
    ],
  },
]);
