import { useState } from "react";
import { Link } from "react-router";

const PetsSupplies = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Temporary Dummy Data
  const demoListings = [
    {
      id: 1,
      name: "Golden Retriever Puppy",
      category: "Pets",
      price: 0,
      location: "Dhaka",
      image: "https://placekitten.com/400/260",
    },
    {
      id: 2,
      name: "Cat Food Premium",
      category: "Food",
      price: 450,
      location: "Chattogram",
      image: "https://placekitten.com/400/250",
    },
    {
      id: 3,
      name: "Pet Toy Ball",
      category: "Accessories",
      price: 120,
      location: "Sylhet",
      image: "https://placekitten.com/400/270",
    },
  ];

  // Search + Filter
  const filteredListings = demoListings.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filter === "All" ? true : item.category === filter;
    return matchName && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
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
              {item.price === 0 ? "Free (Adoption)" : item.price + " BDT"}
            </p>

            <Link
              to={`/listing/${item.id}`}
              className="btn btn-primary btn-sm mt-2"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsSupplies;
