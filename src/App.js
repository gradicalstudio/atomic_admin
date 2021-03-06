import React, { useContext } from "react";
import { FirebaseContext } from "./firebase";
import Admin from "./pages/admin";
import LoginPage from "./pages/login";
function App() {
  const { currentUser } = useContext(FirebaseContext);
  console.log("currentUser", currentUser);

  if (!currentUser) {
    return (
      <div>
        <LoginPage />
      </div>
    );
  } else {
    return (
      <div>
        <Admin />
      </div>
    );
  }
}

export default App;
