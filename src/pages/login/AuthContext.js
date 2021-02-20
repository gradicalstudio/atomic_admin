import React, { useContext, useState } from "react";

const AuthContext = React.createContext({});

function AuthContextProvider({ children }) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  // console.log('isSigningIn', isSigningIn)
  return (
    <AuthContext.Provider
      value={{
        setIsSigningIn: setIsSigningIn,
        isSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
