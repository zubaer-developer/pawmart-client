import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

const Signup = () => {
  const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const photo = event.target.photo.value;

    try {
      //  Firebase Create User
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  Firebase Profile Update
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      //  Backend API Call for Save User in MongoDB
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          photo,
        }),
      });

      alert("Signup Successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSignup} className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create Account
          </h2>

          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="user@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Photo URL Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL (Optional)</span>
            </label>
            <input
              name="photo"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt">Used for profile picture.</span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div role="alert" className="alert alert-error mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-secondary">
              Sign Up
            </button>
          </div>
        </form>

        <div className="card-body pt-0 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="link link-hover text-primary font-bold">
              Login Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
