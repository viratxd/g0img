import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <>
          <RouterProvider router={router} />
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
