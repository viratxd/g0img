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
import {
  getImagesFromDB,
  addFavoriteImage,
  deleteFavoriteImage,
} from "./services/imageService";
import { fetchUserDataFromDB, putUserDataToDB } from "./services/userService";
import { UserContext, IUserContext } from "./contexts/UserContext";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [likeImage, setLikeImage] = useState<ILikeImageContext>({
    likedImages: [],
    add: () => {},
    remove: () => {},
  });

  const [userInfo, setUserInfo] = useState<IUserContext>({
    id: "",
    userName: "",
    email: "",
    updateUserName: () => {},
  });

  // Get user info from DB
  useEffect(() => {
    if (user && user.sub) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetchUserDataFromDB(user.sub!);

          if (response.data) {
            setUserInfo({
              id: response.data._id ?? "",
              email: response.data.email ?? "",
              userName: response.data.userName ?? "",
            });
          }
        } catch (error) {
          console.error("Error getting userInfo from DB", error);
        }
      };

      fetchUserInfo();
    }
  }, [isAuthenticated]);

  // Get saved favorite images from DB
  /*   useEffect(() => {
    if (userInfo) {
      const getSavedFavoriteImages = async () => {
        try {
          const savedFavoriteImages = await getImagesFromDB(userInfo.userName);
          if (savedFavoriteImages) {
            setLikeImage({ ...likeImage, likedImages: savedFavoriteImages });
          }
        } catch (error) {
          console.error("Error getting saved favorite images", error);
        }
      };
      getSavedFavoriteImages();
    }
  }, [userInfo]); */

  // Function: update user name
  userInfo.updateUserName = (newUserName: string) => {
    setUserInfo((prev) => ({
      ...prev,
      userName: newUserName,
    }));

    putUserDataToDB(userInfo.id, newUserName);
  };

  const userContextValue: IUserContext = {
    ...userInfo,
    updateUserName: userInfo.updateUserName,
  };

  // Function: add favorite image
  /*   likeImage.add = (newLikedImage: IImage) => {
    const existingImages = likeImage.likedImages.find(
      (image) => image.image.link === newLikedImage.link
    );

    if (!existingImages) {
      const newFavoriteImage = new LikedImage(
        newLikedImage.link,
        newLikedImage.title
      );

      addFavoriteImage(userInfo.userName, newFavoriteImage);
    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  }; */

  // Function: remove favorite image
  /*   likeImage.remove = (removedImage: string) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      deleteFavoriteImage(userInfo.userName, removedImage);
    }
  }; */

  return (
    <>
      {isAuthenticated ? (
        <UserContext.Provider value={userContextValue}>
          <LikeImageContext.Provider value={likeImage}>
            <RouterProvider router={router} />
          </LikeImageContext.Provider>
        </UserContext.Provider>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
