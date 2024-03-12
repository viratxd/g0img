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

function App() {
  const { isAuthenticated } = useAuth0();
  const [likeImage, setLikeImage] = useState<ILikeImageContext>({
    likedImages: [],
    add: () => {},
    remove: () => {},
  });

  useEffect(() => {
    const getLikedImages = async () => {
      const response = await axios.get("http://localhost:3000/api/favorite");
      setLikeImage({ ...likeImage, likedImages: response.data });
    };
    getLikedImages();
  }, []);

  likeImage.add = (newLikedImage: IImage) => {
    const existingImages = likeImage.likedImages.find(
      (image) => image.title === newLikedImage.title
    );

    if (!existingImages) {
      
      setLikeImage({
        ...likeImage,
        likedImages: [
          ...likeImage.likedImages,
          new LikedImage(newLikedImage.link, newLikedImage.title),
        ],
      });

      const saveLikedImages = async () => {
        await axios.put("http://localhost:3000/api/favorite", newLikedImage);
      };
      saveLikedImages();

    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  };

  likeImage.remove = (removedImage: LikedImage) => {
    const newImages = likeImage.likedImages.filter(
      (image) => image.title !== removedImage.title
    );

    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      setLikeImage({ ...likeImage, likedImages: newImages });
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
