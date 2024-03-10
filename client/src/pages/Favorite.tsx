import { useContext } from "react";
import { LikedImagesContext } from "../contexts/LikedImagesContext";

export const Favorite = () => {
  const { likedImages } = useContext(LikedImagesContext);

  return (
    <div className="favorite">
      <div className="favorite-images">
        {likedImages?.map((image) => (
          <figure className="image">
            <img src={image.image.link} alt={image.image.title} />
          </figure>
        ))}
      </div>
    </div>
  );
};
