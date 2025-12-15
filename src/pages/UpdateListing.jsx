import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Single Listing
  useEffect(() => {
    fetch(`https://pawmart-server-github.vercel.app/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load listing!", "error");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!listing) return <p className="text-center mt-20">No listing found</p>;

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedListing = {
      name: form.name.value,
      category: form.category.value,
      price: Number(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
    };

    fetch(`https://pawmart-server-github.vercel.app/listings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedListing),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result?.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Listing updated successfully",
            icon: "success",
          }).then(() => {
            navigate("/my-listings");
          });
        } else {
          Swal.fire("No changes", "You did not change anything", "info");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Update failed!", "error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* page title */}
      <title>Update Listing</title>
      <h1 className="text-3xl font-bold text-center mb-6">Update Listing</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={listing.name}
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          defaultValue={listing.category}
          className="select select-bordered w-full"
          required
        >
          <option value="Pets">Pets</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="CareProducts">Care Products</option>
        </select>

        <input
          type="number"
          name="price"
          defaultValue={listing.price}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="location"
          defaultValue={listing.location}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="image"
          defaultValue={listing.image}
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="date"
          defaultValue={listing.date}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          defaultValue={listing.description}
          className="textarea textarea-bordered w-full"
          required
        />

        <button className="btn btn-primary w-full">Update Listing</button>
      </form>
    </div>
  );
};

export default UpdateListing;
