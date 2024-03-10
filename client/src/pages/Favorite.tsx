import { useContext } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);
  localStorage.setItem("Liked images", JSON.stringify(likedImages));

  return (
    <div className="favorite">
      <div className="favorite-images">
        {likedImages?.map((image) => (
          <figure className="image">
            <a onClick={() => remove(image)}>
              <span className="material-symbols-outlined">heart_minus</span>
            </a>
            <img src={image.image.link} alt={image.image.title} />
          </figure>
        ))}
      </div>
    </div>
  );
};
