import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useState } from "react";
import { LikedImage } from "./models/LikedImage";
import { ILikedImagesContext, LikedImagesContext } from "./contexts/LikedImagesContext";
import { IImage } from "./models/IImage";

function App() {
  const { isAuthenticated } = useAuth0();
  const [likedImages, setLikedImages] = useState<ILikedImagesContext>({
    likedImages: [],
    add: () => {}
  });

  likedImages.add = (newLikedImage: IImage) => {
    setLikedImages({...likedImages, likedImages: [...likedImages.likedImages, new LikedImage(newLikedImage)]})
  }

  return (
    <>
      {isAuthenticated ? (
        <LikedImagesContext.Provider value={likedImages}>
          <RouterProvider router={router} />
        </LikedImagesContext.Provider>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
