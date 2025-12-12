import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Banner slides (same as before)
const bannerSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1543466835-00624a68770d?q=80&w=2070",
    tagline: "Find Your Furry Friend Today!",
    subtitle: "Adopt, Don’t Shop — Give a Pet a Home.",
    color: "bg-opacity-70 bg-primary",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583337130417-ab842f10b754?q=80&w=2070",
    tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
    subtitle: "Because Every Pet Deserves Love and Care.",
    color: "bg-opacity-70 bg-secondary",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601758535031-1582294101cc?q=80&w=2070",
    tagline: "Because Every Pet Deserves Love and Care.",
    subtitle: "Find the perfect companion and start your journey today.",
    color: "bg-opacity-70 bg-info",
  },
];

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:5000/listings");
        const data = await res.json();

        // Sort descending by creation (_id) and take latest 6
        const latest6 = data
          .sort((a, b) => (b._id > a._id ? 1 : -1))
          .slice(0, 6);

        setListings(latest6);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* Banner Section (Swiper) */}
      <div className="min-h-[400px] rounded-3xl shadow-xl overflow-hidden mb-12 relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{
            "--swiper-pagination-color": "#fff",
            "--swiper-navigation-color": "#fff",
          }}
        >
          {bannerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero min-h-[400px] w-full"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`hero-overlay ${slide.color} rounded-3xl`}
                ></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-extrabold mb-3 leading-tight">
                      {slide.tagline}
                    </h1>
                    <p className="text-xl mt-4">{slide.subtitle}</p>
                    <Link
                      to="/pets-supplies"
                      className="btn btn-primary btn-lg mt-6 shadow-lg transform transition duration-300 hover:scale-[1.02]"
                    >
                      Explore All Pets
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Category Section --- */}
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

      {/* --- Recent Listings --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-neutral">
          Pets Needing a Home
        </h2>
        {loading ? (
          <p className="text-center text-lg">Loading listings...</p>
        ) : listings.length === 0 ? (
          <p className="text-center text-lg">No listings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="card bg-base-200 shadow-xl hover:shadow-2xl duration-200"
              >
                <figure className="h-56">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-6">
                  <h3 className="card-title text-2xl">
                    {listing.name}{" "}
                    <div className="badge badge-primary ml-2">NEW</div>
                  </h3>
                  <p className="text-sm text-neutral-content">
                    Category: {listing.category}
                  </p>
                  <p className="font-bold text-lg text-success mb-2">
                    {listing.category === "Pets" && listing.price === 0
                      ? "Free for Adoption"
                      : `$${listing.price}`}
                  </p>
                  <p className="text-sm text-neutral-content mb-2">
                    Location: {listing.location}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/listing/${listing._id}`}
                      className="btn btn-primary"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
