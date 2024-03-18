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
import axios from "axios";
import { AuthContext, IAuthContext } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [likeImage, setLikeImage] = useState<ILikeImageContext>({
    likedImages: [],
    add: () => {},
    remove: () => {},
  });
  const [auth, setAuth] = useState<IAuthContext>({
    isAuthenticated: true,
    userId: "",
    userName: "",
  });

  useEffect(() => {
    setAuth({
      isAuthenticated: isAuthenticated,
      userId: user?.sub ?? "",
      userName: user?.name ?? "",
    });
  }, [isAuthenticated]);

  useEffect(() => {
    const saveUser = async () => {
      await axios.post("http://localhost:3000/api/users", auth);
    };
    saveUser();
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const getLikedImages = async () => {
      const response = await axios.get("http://localhost:3000/api/users");
      setLikeImage({
        ...likeImage,
        likedImages: response.data[0].favoriteImages,
      });
    };
    getLikedImages();
  }, []);

  likeImage.add = (newLikedImage: IImage) => {
    const existingImages = likeImage.likedImages.find(
      (image) => image.link === newLikedImage.link
    );

    if (!existingImages) {
      const updatedLikedImages = [
        ...likeImage.likedImages,
        new LikedImage(newLikedImage.link, newLikedImage.title),
      ];

      setLikeImage({
        ...likeImage,
        likedImages: updatedLikedImages,
      });

      const saveLikedImage = async () => {
        await axios.put("http://localhost:3000/api/users", {
          userName: auth.userName,
          imageData: updatedLikedImages,
        });
      };
      saveLikedImage();
    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  };

  likeImage.remove = (removedImage: LikedImage) => {
    const updatedLikedImages = likeImage.likedImages.filter(
      (image) => image.title !== removedImage.title
    );

    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      setLikeImage({ ...likeImage, likedImages: updatedLikedImages });

      const removeLikedImage = async () => {
        await axios.put("http://localhost:3000/api/users", {
          userName: auth.userName,
          imageData: updatedLikedImages,
        });
      };
      removeLikedImage();
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
