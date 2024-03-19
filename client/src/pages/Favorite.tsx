import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import axios from "axios";
import { IImage } from "../models/IImage";
import { AuthContext } from "../contexts/AuthContext";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);
  const { userId } = useContext(AuthContext);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const getLikedImages = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}`
      );
      const images = response.data.favoriteImages;
      setImages(images);
    };
    getLikedImages();
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
