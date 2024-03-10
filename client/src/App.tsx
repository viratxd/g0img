import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useState } from "react";
import { LikedImage } from "./models/LikedImage";
import {
  ILikeImageContext,
  LikeImageContext,
} from "./contexts/LikeImageContext";
import { IImage } from "./models/IImage";

function App() {
  const { isAuthenticated } = useAuth0();
  const [likeImage, setLikeImage] = useState<ILikeImageContext>({
    likedImages: JSON.parse(localStorage.getItem("Liked images") || "[]"),
    add: () => {},
  });

  likeImage.add = (
    newLikedImage: IImage
    // e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    // const span = e.target as HTMLAnchorElement;
    // span.innerText = "heart_check";

    const existingImages = likeImage.likedImages.find(
      (img) => img.image.title === newLikedImage.title
    );

    if (!existingImages) {
      setLikeImage({
        ...likeImage,
        likedImages: [...likeImage.likedImages, new LikedImage(newLikedImage)],
      });
    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <LikeImageContext.Provider value={likeImage}>
          <RouterProvider router={router} />
        </LikeImageContext.Provider>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
