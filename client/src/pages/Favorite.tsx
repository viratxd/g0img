import { useContext } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";

export const Favorite = () => {
  const { likedImages, remove } = useContext(LikeImageContext);

  return (
    <div className="favorite">
      <div className="favorite-images">
        {likedImages.length === 0 ? (
          <p>No favorite images yet.</p>
        ) : (
          likedImages.map((image) => (
            <figure key={image._id} className="image">
              <a onClick={() => remove(image._id)}>
                <span className="material-symbols-outlined">heart_minus</span>
              </a>
              <img src={image.image.link} alt={image.image.title} />
            </figure>
          ))
        )}
      </div>
    </div>
  );
};
