import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryFiltered = () => {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/listings/category/${categoryName}`
        );
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">No listings available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* page title */}
      <title>Listings</title>
      <h2 className="text-4xl font-extrabold mb-8 text-center text-neutral">
        {categoryName} Listings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <div
            key={item._id}
            className="card bg-base-200 shadow-xl hover:shadow-2xl duration-200"
          >
            <figure className="h-56">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-6">
              <h3 className="card-title text-2xl">{item.name}</h3>
              <p className="text-sm">Category: {item.category}</p>
              <p className="text-sm">Location: {item.location}</p>
              <p className="font-bold text-lg text-success mb-2">
                Price: {item.price ? `$${item.price}` : "Free for Adoption"}
              </p>
              <div className="card-actions justify-end">
                <Link to={`/listing/${item._id}`} className="btn btn-primary">
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFiltered;
