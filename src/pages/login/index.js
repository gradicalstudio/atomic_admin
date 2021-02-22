import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import Logo from "../../assets/ARROW-LOGO-BLACK.svg";
import { doSignInWithEmailAndPassword } from "../../firebase";
import AuthContext from "./AuthContext";
import LoginPageThunder from "../../assets/chopped.png";

export default function LoginPage() {
  const { setIsSigningIn, isSigningIn } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignInWithEmailAndPassword = () => {
    setIsSigningIn(true);
    doSignInWithEmailAndPassword(email, password)
      .then(async (user) => {
        setIsSigningIn(false);
        console.log("user: ", user);
      })
      .catch((error) => {
        setIsSigningIn(false);
        toast.error(`Couldn't sign in - ${error.message ? error.message : ""}`);
        console.log(error);
      });
  };

  return (
    <div className="flex w-full">
      <div className="flex items-center justify-start px-28 w-2/3 h-screen">
        <div className="flex flex-col gap-5 w-full">
          <div>
            <img src={Logo} loading="lazy" width={190} alt="" />
          </div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2 border-2 border-gray-400 rounded-sm -mt-16 w-2/3 focus:border-blue-400 outline-none"
            placeholder="User name"
          />
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border-2 border-gray-400 rounded-sm w-2/3 focus:border-blue-400 outline-none"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => {
              if (email && password) {
                handleSignInWithEmailAndPassword();
              } else {
                toast.error("Email/Password is missing...");
              }
            }}
            className="px-2 py-2 bg-blue-50 text-blue-400 rounded-sm border border-blue-400 w-5/12 font-medium focus:outline-none"
          >
            {isSigningIn ? "Please wait..." : "Login to Dashboard"}
          </button>
        </div>
      </div>
      <div className="w-full h-screen flex justify-end">
        <img src={LoginPageThunder} alt="" width="100%" />
      </div>
    </div>
  );
}
