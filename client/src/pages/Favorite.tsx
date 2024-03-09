import { useContext } from "react";
import { LikedImagesContext } from "../contexts/LikedImagesContext";

export const Favorite = () => {
  const { likedImages } = useContext(LikedImagesContext);

  return (
    <div className="result-images">
      {likedImages?.map((image) => (
        <figure className="image">
          <button>
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <img src={image.image.link} alt={image.image.title} />
        </figure>
      ))}
    </div>
  );
};
