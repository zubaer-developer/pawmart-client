import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const AddListing = () => {
  const { user } = useContext(AuthContext);

  const handleAddListing = async (event) => {
    event.preventDefault();

    const form = event.target;

    const newListing = {
      name: form.name.value,
      category: form.category.value,
      price: Number(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user?.email,
    };

    console.log("Listing Data:", newListing);

    // Send to backend
    const res = await fetch("http://localhost:5000/listings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newListing),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Listing Added Successfully!",
        text: `${newListing.name} is now available on PawMart.`,
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Listing",
        text: data.message || "Something went wrong.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Listing</h1>

      <form onSubmit={handleAddListing} className="space-y-4">
        {/* Product / Pet Name */}
        <input
          type="text"
          name="name"
          placeholder="Product/Pet Name"
          required
          className="input input-bordered w-full"
        />

        {/* Category */}
        <select
          name="category"
          required
          className="select select-bordered w-full"
        >
          <option value="Pets">Pets</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="CareProducts">Care Products</option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price (0 if adoption)"
          required
          className="input input-bordered w-full"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="input input-bordered w-full"
        />

        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          required
          className="input input-bordered w-full"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          required
          className="textarea textarea-bordered w-full"
        />

        {/* Email (readonly) */}
        <input
          type="email"
          value={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
