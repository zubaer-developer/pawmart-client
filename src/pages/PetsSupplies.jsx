import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PetsSupplies = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings from server
  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Search + Filter
  const filteredListings = listings.filter((item) => {
    const matchName = item.name?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filter === "All" ? true : item.category === filter;
    return matchName && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* page title */}
      <title>Pets Supplies</title>
      <h1 className="text-3xl font-bold text-center mb-8">Pets & Supplies</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Pets">Pets</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="CareProducts">Care Products</option>
        </select>
      </div>

      {/* Listings */}
      {filteredListings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item._id}
              className="p-5 bg-base-100 shadow rounded-xl hover:shadow-lg duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-sm mb-1">Category: {item.category}</p>
              <p className="text-sm mb-1">Location: {item.location}</p>
              <p className="font-semibold mb-2">
                Price:{" "}
                {item.price === 0 || item.price === "0"
                  ? "Free (Adoption)"
                  : `${item.price} BDT`}
              </p>

              <Link
                to={`/listing/${item._id}`}
                className="btn btn-primary btn-sm mt-2 w-full"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetsSupplies;
