import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { LikeImageContext } from "./contexts/LikeImageContext";
import { UserContext } from "./contexts/UserContext";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { useUserInit } from "./hooks/useUserInit";
import { useUserHandler } from "./hooks/useUserHandler";
import { useLikeImageHandler } from "./hooks/useLikeImageHandler";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { loading, userInfo: rawUserInfo, favoriteImages } = useUserInit();
  const { userInfo } = useUserHandler(rawUserInfo);
  const { likeImageContext } = useLikeImageHandler(userInfo.id, favoriteImages);

  if (loading || isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <LoginPage />;

  return (
    <UserContext.Provider value={userInfo}>
      <LikeImageContext.Provider value={likeImageContext}>
        <RouterProvider router={router} />
        <ScrollToTopButton />
      </LikeImageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
