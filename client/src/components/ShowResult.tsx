import { useContext } from "react";
import { IImage } from "../models/IImage";
import { LikeImageContext } from "../contexts/LikeImageContext";
import LoadingSpinner from "./ui/LoadingSpinner";

interface IShowResultProps {
  searchWord: string;
  searchTime: string;
  correctedQuery: string;
  images: IImage[];
  isLoading: boolean;
  search: (text: string) => void;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export const ShowResult = ({
  searchWord,
  searchTime,
  correctedQuery,
  images,
  isLoading,
  search,
  scrollRef,
}: IShowResultProps) => {
  const { add, likedImages } = useContext(LikeImageContext);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="result">
      <div className="result-info">
        {correctedQuery && (
          <p className="corrected-query">
            Did you mean{" "}
            <a onClick={() => search(correctedQuery)}>{correctedQuery}</a> ?
          </p>
        )}
        {searchWord && !correctedQuery && (
          <h3>
            Result for: <em>{searchWord}</em>
          </h3>
        )}
        {searchTime && <p>Search time: {searchTime}sec</p>}
      </div>
      <div className="result-images">
        {images?.map((image) => (
          <figure key={image.link} className="image">
            <a onClick={() => add(image)}>
              {likedImages.some(
                (likedImage) => image.title === likedImage.image.title
              ) ? (
                <span
                  className="material-symbols-outlined"
                  style={{ color: "#de4c64" }}
                >
                  heart_check
                </span>
              ) : (
                <span className="material-symbols-outlined">favorite</span>
              )}
            </a>
            <img src={image.link} alt={image.title} />
          </figure>
        ))}
      </div>
      <div ref={scrollRef} style={{ height: "1px" }}></div>
      {isLoading && <LoadingSpinner />}
    </section>
  );
};
