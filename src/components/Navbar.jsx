import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const navItems = (
    <>
      <NavLink
        to="/"
        className="btn btn-ghost text-base font-medium mr-1 rounded-btn"
      >
        Home
      </NavLink>
      <NavLink
        to="/all-listings"
        className="btn btn-ghost text-base font-medium mr-1 rounded-btn"
      >
        All Listings
      </NavLink>

      {user?.email && (
        <>
          <NavLink
            to="/add-listing"
            className="btn btn-ghost text-base font-medium mr-1 rounded-btn"
          >
            Add Listing
          </NavLink>
          <NavLink
            to="/my-listings"
            className="btn btn-ghost text-base font-medium mr-1 rounded-btn"
          >
            My Listings
          </NavLink>
          <NavLink
            to="/profile"
            className="btn btn-ghost text-base font-medium mr-1 rounded-btn"
          >
            Profile
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-100 shadow-xl z-50 sticky top-0">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/*  Mobile Menu & Logo */}
        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              {/* Main Nav Items */}
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/all-listings">All Listings</NavLink>
              </li>
              {user?.email && (
                <>
                  <li>
                    <NavLink to="/add-listing">Add Listing</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-listings">My Listings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                </>
              )}
              <div className="divider my-1"></div>
              {/* Auth Links/Button */}
              {!user?.email ? (
                <>
                  <li>
                    <NavLink
                      to="/signup"
                      className="btn btn-primary btn-sm mt-1"
                    >
                      Signup
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="btn btn-secondary btn-sm mt-1"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={logoutUser}
                    className="btn btn-error btn-sm w-full mt-2"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-extrabold text-primary hover:bg-transparent"
          >
            PET ADOPTION
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center space-x-1">{navItems}</div>
        </div>

        <div className="navbar-end hidden lg:flex">
          {!user?.email ? (
            <>
              <NavLink
                to="/signup"
                className="btn btn-outline btn-primary mr-2"
              >
                Signup
              </NavLink>
              <NavLink to="/login" className="btn btn-primary">
                Login
              </NavLink>
            </>
          ) : (
            <button onClick={logoutUser} className="btn btn-error">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
