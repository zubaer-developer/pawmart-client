// import React from "react";
// import { Link } from "react-router";

// const Home = () => {
//   return (
//     <div>
//       {/* Banner Section */}
//       <div className="hero h-96 bg-base-200 rounded-xl flex items-center justify-center mb-10">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-3">
//             Find Your Furry Friend Today! 🐾
//           </h1>
//           <p className="text-lg">
//             Adopt, Don’t Shop — Because Every Pet Deserves Love & Care.
//           </p>
//         </div>
//       </div>

//       {/* Category Section */}
//       <div className="max-w-7xl mx-auto mb-12">
//         <h2 className="text-3xl font-bold mb-6 text-center">Categories</h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* Pets */}
//           <Link
//             to="/category-filtered-product/Pets"
//             className="p-6 bg-base-100 shadow rounded-xl text-center hover:scale-105 duration-200"
//           >
//             <h3 className="text-xl font-bold mb-2">🐶 Pets</h3>
//             <p>Adoption</p>
//           </Link>

//           {/* Food */}
//           <Link
//             to="/category-filtered-product/Food"
//             className="p-6 bg-base-100 shadow rounded-xl text-center hover:scale-105 duration-200"
//           >
//             <h3 className="text-xl font-bold mb-2">🍖 Pet Food</h3>
//             <p>Healthy & Nutritious</p>
//           </Link>

//           {/* Accessories */}
//           <Link
//             to="/category-filtered-product/Accessories"
//             className="p-6 bg-base-100 shadow rounded-xl text-center hover:scale-105 duration-200"
//           >
//             <h3 className="text-xl font-bold mb-2">🧸 Accessories</h3>
//             <p>Toys & Essentials</p>
//           </Link>

//           {/* Care Products */}
//           <Link
//             to="/category-filtered-product/CareProducts"
//             className="p-6 bg-base-100 shadow rounded-xl text-center hover:scale-105 duration-200"
//           >
//             <h3 className="text-xl font-bold mb-2">💊 Pet Care</h3>
//             <p>Products & Supplies</p>
//           </Link>
//         </div>
//       </div>

//       {/* Recent Listings */}
//       <div className="max-w-7xl mx-auto mb-12">
//         <h2 className="text-3xl font-bold mb-6 text-center">Recent Listings</h2>

//         {/* Demo Card Grid (API Later) */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Temporary Cards */}
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="p-5 bg-base-100 shadow rounded-xl hover:shadow-lg duration-200"
//             >
//               <img
//                 src="https://placekitten.com/300/200"
//                 alt="pet"
//                 className="rounded mb-4 w-full h-48 object-cover"
//               />
//               <h3 className="text-xl font-bold">Cute Pet {item}</h3>
//               <p className="text-sm mb-2">Category: Pet</p>
//               <p className="font-semibold mb-2">Price: Free</p>

//               <Link
//                 to={`/listing/${item}`}
//                 className="btn btn-primary btn-sm mt-2"
//               >
//                 See Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom"; // NOTE: Fixed typo in original code: 'react-router' should likely be 'react-router-dom'

const Home = () => {
  return (
    // Global container can have padding and a minimum height for background consistency
    <div className="min-h-screen bg-base-100 p-4">
      {/* --- 1. Banner Section (Enhanced Hero Component) --- */}
      {/* UPDATED: Using a large, visually striking hero with background image style */}
      <div
        className="hero min-h-[400px] bg-secondary-content/10 rounded-3xl shadow-xl overflow-hidden mb-12"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1543466835-00624a68770d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        {/* Added overlay for better text contrast */}
        <div className="hero-overlay bg-opacity-70 bg-secondary rounded-3xl"></div>

        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold mb-3 leading-tight">
              Find Your Furry Friend Today! 🐾
            </h1>
            <p className="text-xl mt-4">
              Adopt, Don’t Shop — Because Every Pet Deserves Love & Care.
            </p>
            {/* Call to action button */}
            <Link
              to="/all-listings"
              className="btn btn-primary btn-lg mt-6 shadow-lg transform transition duration-300 hover:scale-[1.02]"
            >
              Explore All Pets
            </Link>
          </div>
        </div>
      </div>

      {/* --- 2. Category Section (Enhanced Cards) --- */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-neutral">
          Explore Our Pet Ecosystem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pets */}
          <Link
            to="/category-filtered-product/Pets"
            // UPDATED: Used daisyUI 'card' classes for a professional, uniform look
            className="card card-compact bg-base-200 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-base-300 hover:scale-[1.03]"
          >
            <div className="card-body items-center text-center">
              <h3 className="text-4xl mb-2">🐶</h3>
              <h3 className="card-title text-2xl">Pets Adoption</h3>
              <p className="text-sm text-neutral-content">
                Ready for a loving home.
              </p>
            </div>
          </Link>

          {/* Food */}
          <Link
            to="/category-filtered-product/Food"
            className="card card-compact bg-base-200 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-base-300 hover:scale-[1.03]"
          >
            <div className="card-body items-center text-center">
              <h3 className="text-4xl mb-2">🍖</h3>
              <h3 className="card-title text-2xl">Pet Food</h3>
              <p className="text-sm text-neutral-content">
                Healthy & Nutritious.
              </p>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            to="/category-filtered-product/Accessories"
            className="card card-compact bg-base-200 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-base-300 hover:scale-[1.03]"
          >
            <div className="card-body items-center text-center">
              <h3 className="text-4xl mb-2">🧸</h3>
              <h3 className="card-title text-2xl">Accessories</h3>
              <p className="text-sm text-neutral-content">Toys & Essentials.</p>
            </div>
          </Link>

          {/* Care Products */}
          <Link
            to="/category-filtered-product/CareProducts"
            className="card card-compact bg-base-200 shadow-xl transition duration-300 hover:shadow-2xl hover:bg-base-300 hover:scale-[1.03]"
          >
            <div className="card-body items-center text-center">
              <h3 className="text-4xl mb-2">💊</h3>
              <h3 className="card-title text-2xl">Pet Care</h3>
              <p className="text-sm text-neutral-content">
                Products & Supplies.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* --- 3. Recent Listings (Enhanced Card Display) --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-neutral">
          Pets Needing a Home
        </h2>

        {/* Demo Card Grid (API Later) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Temporary Cards */}
          {[1, 2, 3].map((item) => (
            // UPDATED: Using daisyUI 'card' component for listings
            <div
              key={item}
              className="card bg-base-200 shadow-xl hover:shadow-2xl duration-200"
            >
              <figure className="h-56">
                <img
                  src={`https://picsum.photos/id/${item + 50}/400/300`} // Using picsum for better demo images
                  alt={`Pet listing ${item}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="card-title text-2xl">
                  Cute Pet {item}
                  {/* Optional: Add a badge for new listings */}
                  <div className="badge badge-primary ml-2">NEW</div>
                </h3>
                <p className="text-sm text-neutral-content">Category: Pet</p>
                <p className="font-bold text-lg text-success mb-2">
                  Price: Free
                </p>

                <div className="card-actions justify-end">
                  <Link to={`/listing/${item}`} className="btn btn-primary">
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
