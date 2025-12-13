import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const auth = getAuth(app);

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Email/Password login
  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setError("");

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      const userData = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || email,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
      };

      setUser(userData);

      // Save user in DB
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome, ${userData.displayName}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      console.log("Firebase User Object:", firebaseUser);

      // Get proper email from providerData
      const email =
        firebaseUser.email ||
        firebaseUser.providerData[0]?.email ||
        result._tokenResponse?.email ||
        "";
      console.log("Extracted Email:", email);

      const userData = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || email,
        email: email,
        photoURL: firebaseUser.photoURL || "",
      };
      console.log("Final User Data sent to Context/DB:", userData);

      setUser(userData);

      // Save user in MongoDB
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome, ${userData.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Welcome Back!
          </h2>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-secondary mb-4 w-full"
          >
            Continue with Google
          </button>

          <div className="divider">OR</div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin}>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
                <a
                  href="#"
                  className="label-text-alt link link-hover text-red-300"
                >
                  Forgot password?
                </a>
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            {error && (
              <div role="alert" className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="card-body pt-0 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="link link-hover text-secondary font-bold"
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
