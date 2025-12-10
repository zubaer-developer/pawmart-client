import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // 1) Firebase Login
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase User:", result.user);

      alert("Login Successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" required /> <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
