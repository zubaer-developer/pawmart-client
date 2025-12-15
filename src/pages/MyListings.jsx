import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://pawmart-server-github.vercel.app/listings/user/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setListings(data.data || data || []));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://pawmart-server-github.vercel.app/listings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0 || data.result?.deletedCount > 0) {
              Swal.fire("Deleted!", "Listing has been removed.", "success");

              // Remove from UI
              setListings(listings.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* page title */}
      <title>My Listing</title>
      <h1 className="text-3xl font-bold text-center mb-6">My Listings</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th colSpan={3} className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {listings.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} className="w-14 h-14 rounded" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price === 0 ? "Free" : item.price + "৳"}</td>

                {/* View Details */}
                <td>
                  <button
                    onClick={() => navigate(`/listing/${item._id}`)}
                    className="btn btn-info btn-sm"
                  >
                    View
                  </button>
                </td>

                {/* Edit */}
                <td>
                  <button
                    onClick={() => navigate(`/update/${item._id}`)}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </button>
                </td>

                {/* Delete */}
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;
