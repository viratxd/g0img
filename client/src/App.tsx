import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect, useState } from "react";
import { LikedImage } from "./models/LikedImage";
import {
  ILikeImageContext,
  LikeImageContext,
} from "./contexts/LikeImageContext";
import { IImage } from "./models/IImage";
import { AuthContext, IAuthContext } from "./contexts/AuthContext";
import {
  createNewUser,
  getImagesFromServer,
  saveUpdatedFavorite,
} from "./services/imageService";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [likeImage, setLikeImage] = useState<ILikeImageContext>({
    likedImages: [],
    add: () => {},
    remove: () => {},
  });
  const [auth, setAuth] = useState<IAuthContext>({
    isAuthenticated: true,
    userIdWithGoogle: "",
    userIdWithGithub: "",
    userName: "",
  });

  useEffect(() => {
    setAuth({
      isAuthenticated: isAuthenticated,
      userIdWithGoogle: user?.sub?.includes("google") ? user.sub : "",
      userIdWithGithub: user?.sub?.includes("github") ? user.sub : "",
      userName: user?.name ?? "",
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (auth.userName) {
      createNewUser(auth.userName, auth);

      const getSavedFavoriteImages = async () => {
        try {
          const savedFavoriteImages = await getImagesFromServer(auth.userName);
          if (savedFavoriteImages) {
            setLikeImage({...likeImage, likedImages: savedFavoriteImages });
          }
        } catch (error) {
          console.error("Error getting saved favorite images", error);
        }
      };
      getSavedFavoriteImages();
    }
  }, [auth]);

  const updateFavoriteImages = async (updatedFavoriteImages: LikedImage[]) => {
    setLikeImage({ ...likeImage, likedImages: updatedFavoriteImages });
    try {
      await saveUpdatedFavorite(auth.userName, updatedFavoriteImages);
    } catch (error) {
      console.error("Error update favorite images", error);
    }
  };

  likeImage.add = (newLikedImage: IImage) => {
    const existingImages = likeImage.likedImages.find(
      (image) => image.link === newLikedImage.link
    );

    if (!existingImages) {
      const updatedFavoriteImages = [
        ...likeImage.likedImages,
        new LikedImage(newLikedImage.link, newLikedImage.title),
      ];

      updateFavoriteImages(updatedFavoriteImages);
    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  };

  likeImage.remove = (removedImage: IImage) => {
    const updatedFavoriteImages = likeImage.likedImages.filter(
      (image) => image.title !== removedImage.title
    );

    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      updateFavoriteImages(updatedFavoriteImages);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <AuthContext.Provider value={auth}>
          <LikeImageContext.Provider value={likeImage}>
            <RouterProvider router={router} />
          </LikeImageContext.Provider>
        </AuthContext.Provider>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
