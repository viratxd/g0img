import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { IUserContext } from "../contexts/UserContext";
import { getImagesFromDB } from "../services/imageService";
import { fetchUserDataFromDB } from "../services/userService";
import { IFavoriteImage } from "../models/IFavoriteImage";

export const useUserInit = () => {
  const { isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<IUserContext>({
    id: "",
    userName: "",
    email: "",
    updateUserName: () => {},
  });

  const [favoriteImages, setFavoriteImages] = useState<IFavoriteImage[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        if (!isAuthenticated || !user?.sub) return;

        const userData = await fetchUserDataFromDB(user.sub);

        if (!userData) return;

        const { _id, email, userName } = userData.data;

        setUserInfo({
          id: _id ?? "",
          email: email ?? "",
          userName: userName ?? "",
        });

        const savedFavoriteImages = await getImagesFromDB(_id);

        if (savedFavoriteImages) setFavoriteImages(savedFavoriteImages);
      } catch (error) {
        console.error("Error getting userInfo from DB", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [isAuthenticated, user]);

  return { loading, userInfo, setUserInfo, favoriteImages };
};
