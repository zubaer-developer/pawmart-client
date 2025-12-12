import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/listings/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data));
  }, [id]);

  if (!listing) return <p className="text-center mt-20">Loading...</p>;

  const handleOrder = () => {
    if (!user) {
      Swal.fire("Login First!", "You must log in to place an order", "warning");
      return navigate("/login");
    }

    const orderData = {
      listingId: listing._id,
      listingName: listing.name,
      price: listing.price,
      buyer: user.email,
      date: new Date(),
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", "Order placed successfully", "success");
      });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 my-10">
      <img src={listing.image} alt="" className="w-full rounded-lg" />

      <h1 className="text-3xl font-bold">{listing.name}</h1>
      <p className="text-lg">Category: {listing.category}</p>
      <p className="text-lg">Location: {listing.location}</p>
      <p className="text-lg">Price: ${listing.price}</p>

      <p className="mt-4">{listing.description}</p>

      <button onClick={handleOrder} className="btn btn-primary w-full mt-6">
        Order Now
      </button>
    </div>
  );
};

export default ListingDetails;
