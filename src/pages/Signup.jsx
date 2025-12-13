import { useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const auth = getAuth(app);

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // COMMON FUNCTIONS
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return null; // No error
  };

  // EMAIL/PASSWORD SIGNUP
  // ----------------------------------------------------
  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const photo = event.target.photo.value;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: passwordError,
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      // Firebase Create User
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firebase Profile Update
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      const updatedUser = {
        uid: result.user.uid,
        displayName: name,
        email: email,
        photoURL: photo,
      };
      setUser(updatedUser);

      // Backend API Call for Save User in MongoDB
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          photo,
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Welcome to PawMart!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  // GOOGLE SIGNUP
  // ----------------------------------------------------
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Email Extraction Logic
      const email =
        firebaseUser.email ||
        firebaseUser.providerData[0]?.email ||
        result._tokenResponse?.email ||
        "";

      const userData = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || email,
        email: email,
        photoURL: firebaseUser.photoURL || "",
      };

      setUser(userData);

      // Save user in MongoDB
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Welcome to PawMart!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Google Signin Failed",
        text: err.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  // ----------------------------------------------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSignup} className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create Account
          </h2>

          <button
            onClick={handleGoogleSignup}
            type="button"
            className="btn btn-outline btn-secondary mb-4 w-full"
          >
            Continue with Google
          </button>

          <div className="divider">OR</div>

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
