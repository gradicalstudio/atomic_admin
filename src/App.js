import React, { useContext } from "react";
import { FirebaseContext } from "./firebase";
import LoginPage from "./pages/login";
function App() {
  const { currentUser } = useContext(FirebaseContext);
  console.log("currentUser", currentUser);
  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;
