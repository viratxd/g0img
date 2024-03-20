import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import axios from "axios";
import { IImage } from "../models/IImage";
import { AuthContext } from "../contexts/AuthContext";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);
  const { userIdWithGoogle, userIdWithGithub } = useContext(AuthContext);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const getFavoriteImages = async () => {
      const userId = userIdWithGoogle || userIdWithGithub;

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/user/${userId}`
          );
          const imagesFromApi = response.data.favoriteImages;
          setImages(imagesFromApi);
        } catch (error) {
          console.error("axios get error", error);
        }
      } else {
        console.log("User ID not found");
      }
    };
    getFavoriteImages();
  }, [likedImages]);

  return (
    <div className="favorite">
      <div className="favorite-images">
        {images?.map((image) => (
          <figure key={image.link} className="image">
            <a onClick={() => remove(image)}>
              <span className="material-symbols-outlined">heart_minus</span>
            </a>
            <img src={image.link} alt={image.title} />
          </figure>
        ))}
      </div>
    </div>
  );
};
