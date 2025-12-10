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
      // 1) Firebase Create User
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2) Firebase Profile Update
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      // 3) Backend API Call → Save User in MongoDB
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
    <div style={{ padding: 20 }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" required /> <br />
        <input name="email" placeholder="Email" required /> <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
        />{" "}
        <br />
        <input name="photo" placeholder="Photo URL" required /> <br />
        <button type="submit">Sign Up</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
