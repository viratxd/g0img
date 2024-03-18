import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import axios from "axios";
import { IImage } from "../models/IImage";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const getLikedImages = async () => {
      const response = await axios.get("http://localhost:3000/api/users");
      const images = response.data[0].favoriteImages;
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
