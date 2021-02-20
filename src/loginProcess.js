import React, { useState, useEffect, useContext } from "react";
import firebase from "./firebase";
import App from "./App";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseContext } from "./firebase";
import AuthContext from "./pages/login/AuthContext";

const LoginProcess = () => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { setIsSigningIn, isSigningIn } = useContext(AuthContext);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          console.log("UID", user.uid);
          setCurrentUser(user);
          setPending(false);
          //     let finalData = await checkIfUser(user);
          //     if (finalData) {
          //       setCurrentUser(finalData);
          //       setPending(false);
          //       console.log("final Data", finalData);
          //     } else {
          //       setIsSigningIn(false);
          //       setPending(false);
          //       toast.error("Failed to login");
          //       firebase.auth().signOut();
          //     }
        } else {
          setIsSigningIn(false);
          setPending(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.log("error", error);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (pending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        currentUser,
        setCurrentUser,
        setToken,
        token,
        setIsSigningIn,
      }}
    >
      <App />
    </FirebaseContext.Provider>
  );
};
export default LoginProcess;
