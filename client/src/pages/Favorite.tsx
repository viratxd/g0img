import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import { IFavoriteImage } from "../models/IFavoriteImage";
import { AuthContext } from "../contexts/AuthContext";
import { getImagesFromDB } from "../services/imageService";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);
  const { userName } = useContext(AuthContext);
  const [images, setImages] = useState<IFavoriteImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFavoriteImages = async () => {
      if (userName) {
        try {
          setIsLoading(true);
          const imagesFromServer = await getImagesFromDB(userName);
          setImages(imagesFromServer);
        } catch (error) {
          console.error("axios get error", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log(`User ${userName} not found`);
      }
    };
    getFavoriteImages();
  }, [likedImages]);
  console.log("images", images);
  
  return (
    <div className="favorite">
      {isLoading ? (
        <span>loading</span>
      ) : (
        <div className="favorite-images">
          {images.map((image) => (
            <figure key={image._id} className="image">
              <a onClick={() => remove(image._id)}>
                <span className="material-symbols-outlined">heart_minus</span>
              </a>
              <img src={image.image.link} alt={image.image.title} />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};
