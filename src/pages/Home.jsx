import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* ---  Banner Section --- */}
      <div
        className="hero min-h-[400px] bg-secondary-content/10 rounded-3xl shadow-xl overflow-hidden mb-12"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1543466835-00624a68770d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
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

      {/* --- 2. Category Section --- */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-neutral">
          Explore Our Pet Ecosystem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pets */}
          <Link
            to="/category-filtered-product/Pets"
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

      {/* ---  Recent Listings --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-neutral">
          Pets Needing a Home
        </h2>

        {/* Demo Card Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Temporary Cards */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="card bg-base-200 shadow-xl hover:shadow-2xl duration-200"
            >
              <figure className="h-56">
                <img
                  src={`https://picsum.photos/id/${item + 50}/400/300`}
                  alt={`Pet listing ${item}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="card-title text-2xl">
                  Cute Pet {item}
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
