import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FaUserCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaListAlt,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading, logoutUser } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">You are not logged in.</h2>
        <Link to="/login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 py-10">
      {/*  Hero/Header Section */}
      <div className="hero bg-base-200 rounded-2xl shadow-xl mb-12 p-8">
        <div className="hero-content flex-col lg:flex-row w-full">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user.photoURL || "https://i.ibb.co/6P65m09/placeholder.png"
                }
                alt={user.displayName}
              />
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-primary flex items-center gap-2">
              <FaUserCircle className="text-3xl" /> {user.displayName}
            </h1>
            <p className="py-2 text-lg flex items-center gap-2 justify-center lg:justify-start">
              <FaEnvelope className="text-sm text-gray-500" /> {user.email}
            </p>
            <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="badge badge-lg badge-outline badge-primary">
                Member Since: {new Date().toLocaleDateString()}
              </div>
              <div className="badge badge-lg badge-ghost flex items-center gap-1">
                <FaMapMarkerAlt className="text-sm" /> Dhaka, Bangladesh
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:ml-auto">
            <button onClick={logoutUser} className="btn btn-error btn-outline">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/*  Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/*  Sidebar/Menu */}
        <div className="lg:col-span-1">
          <ul className="menu bg-base-100 w-full p-4 rounded-xl shadow-lg border border-base-300">
            <li className="menu-title text-lg font-semibold">Dashboard Menu</li>
            <li>
              <Link to="/my-listings" className="text-base">
                <FaListAlt /> My Listings
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="text-base">
                <FaShoppingCart /> My Orders
              </Link>
            </li>
            <li>
              <a className="text-base">
                <FaHeart /> Favorites (0)
              </a>
            </li>
            <li className="mt-4">
              <a className="text-base text-warning">Edit Profile</a>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-2xl font-bold border-b pb-2">Activity Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-primary text-primary-content shadow-xl transition duration-300 hover:scale-[1.02]">
              <div className="card-body p-6">
                <h3 className="card-title text-3xl font-extrabold">5</h3>
                <p className="text-sm opacity-90">Active Listings</p>
              </div>
            </div>

            <div className="card bg-secondary text-secondary-content shadow-xl transition duration-300 hover:scale-[1.02]">
              <div className="card-body p-6">
                <h3 className="card-title text-3xl font-extrabold">2</h3>
                <p className="text-sm opacity-90">Pending Orders</p>
              </div>
            </div>

            <div className="card bg-accent text-accent-content shadow-xl transition duration-300 hover:scale-[1.02]">
              <div className="card-body p-6">
                <h3 className="card-title text-3xl font-extrabold">4</h3>
                <p className="text-sm opacity-90">Total Pets Adopted/Sold</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold border-b pb-2 pt-4">
            Recent Activity
          </h2>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.857a.75.75 0 00-1.214-.886l-2.75 3.667-1.125-1.125a.75.75 0 00-1.06 1.06l1.625 1.625a.75.75 0 001.06 0l3.25-4.333z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10 md:text-left">
                <time className="font-mono italic text-sm">2 hours ago</time>
                <div className="text-lg font-black">Listing Added</div>
                <div className="badge badge-success badge-sm">
                  New Pet Listing: Simba the Cat
                </div>
              </div>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-secondary"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9.75A.75.75 0 005.75 10h8.5a.75.75 0 000-1.5H5.75A.75.75 0 005 9.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-right">
                <time className="font-mono italic text-sm">Yesterday</time>
                <div className="text-lg font-black">Order Placed</div>
                <div className="badge badge-warning badge-sm">
                  Order #1002 for Dog Food
                </div>
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
