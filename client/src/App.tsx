import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect, useState } from "react";
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
import { IFavoriteImage } from "./models/IFavoriteImage";
import LoadingSpinner from "./components/ui/LoadingSpinner";

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
  const [loading, setLoading] = useState(true);

  // Get user info & user's favorite images from DB
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!isAuthenticated || !user?.sub) return;

      try {
        const response = await fetchUserDataFromDB(user.sub);

        if (!response) return;

        const { _id, email, userName } = response.data;

        setUserInfo({
          id: _id ?? "",
          email: email ?? "",
          userName: userName ?? "",
        });

        const savedFavoriteImages = await getImagesFromDB(_id);

        if (savedFavoriteImages) {
          setLikeImage((prev) => ({
            ...prev,
            likedImages: savedFavoriteImages,
          }));
        }
      } catch (error) {
        console.error("Error getting userInfo from DB", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [isAuthenticated, user]);

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
  likeImage.add = (newLikedImage: IImage) => {
    const existingImages = likeImage.likedImages.find(
      (image) => image.image.link === newLikedImage.link
    );

    if (!existingImages) {
      const newFavoriteImage: IFavoriteImage = {
        _id: "",
        userId: userInfo.id,
        image: {
          link: newLikedImage.link,
          title: newLikedImage.title,
        },
      };

      addFavoriteImage(userInfo.id, newFavoriteImage.image);

      setLikeImage((prev) => ({
        ...prev,
        likedImages: [...prev.likedImages, newFavoriteImage],
      }));
    } else {
      window.alert("This image is already existing in your favorite list.");
    }
  };

  // Function: remove favorite image
  likeImage.remove = (removedImage: string) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      deleteFavoriteImage(userInfo.id, removedImage)
        .then(() => {
          setLikeImage((prev) => ({
            ...prev,
            likedImages: prev.likedImages.filter(
              (image) => image._id !== removedImage
            ),
          }));
        })
        .catch((error) => {
          console.error("Error removing image from favorites", error);
        });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : isAuthenticated ? (
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
