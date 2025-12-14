import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase observer — keeps user logged in on reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        let extractedEmail = loggedUser.email;

        if (!extractedEmail && loggedUser.providerData) {
          const googleProvider = loggedUser.providerData.find(
            (p) => p.providerId === "google.com"
          );
          if (googleProvider && googleProvider.email) {
            extractedEmail = googleProvider.email;
          }
        }

        const customUserData = {
          uid: loggedUser.uid,
          displayName: loggedUser.displayName || extractedEmail || "User",
          email: extractedEmail || "",
          photoURL: loggedUser.photoURL || "",
        };

        console.log(
          "AuthProvider: User state loaded/refreshed:",
          customUserData.email
        );
        setUser(customUserData);
      } else {
        console.log("AuthProvider: No user found.");
        setUser(null);
      }
      setLoading(false);
      console.log(
        "Auth State Changed. User:",
        loggedUser ? loggedUser.email : "None"
      );
    });

    return () => unsubscribe();
  }, []);

  const logoutUser = () => signOut(auth);

  const value = { user, setUser, loading, logoutUser };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Initial App Loading...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
