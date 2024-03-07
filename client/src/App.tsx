import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      Image Search
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </>
  );
}

export default App;
