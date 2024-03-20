import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import { IImage } from "../models/IImage";
import { AuthContext } from "../contexts/AuthContext";
import { getImagesFromServer } from "../services/imageService";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);
  const { userName } = useContext(AuthContext);
  const [images, setImages] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getFavoriteImages = async () => {
      if (userName) {
        try {
          const imagesFromServer = await getImagesFromServer(userName);
          setImages(imagesFromServer);
        } catch (error) {
          console.error("axios get error", error);
        }
      } else {
        console.log(`User ${userName} not found`);
      }
    };
    getFavoriteImages();
    setIsLoading(false);
  }, [likedImages]);

  return (
    <div className="favorite">
      {isLoading ? (
        <span>loading</span>
      ) : (
        <div className="favorite-images">
          {images.map((image) => (
            <figure key={image.link} className="image">
              <a onClick={() => remove(image)}>
                <span className="material-symbols-outlined">heart_minus</span>
              </a>
              <img src={image.link} alt={image.title} />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};
