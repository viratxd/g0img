import { useContext } from "react";
import { IImage } from "../models/IImage";
import { LikeImageContext } from "../contexts/LikeImageContext";

interface IShowResultProps {
  searchWord: string;
  searchTime: string;
  correctedQuery: string;
  images: IImage[];
  isLoading: boolean;
  search: (text: string) => void;
}

export const ShowResult = ({
  searchWord,
  searchTime,
  correctedQuery,
  images,
  isLoading,
  search,
}: IShowResultProps) => {
  const { add } = useContext(LikeImageContext);
  
  return (
    <>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <section className="result">
          <div className="result-info">
            {correctedQuery ? (
              <p className="corrected-query">
                Did you mean{" "}
                <a onClick={() => search(correctedQuery)}>{correctedQuery}</a> ?
              </p>
            ) : (
              <></>
            )}
            {searchWord && !correctedQuery ? (
              <h3>
                Result for: <em>{searchWord}</em>
              </h3>
            ) : (
              <></>
            )}
            {searchTime ? <p>Search time: {searchTime}sec</p> : <></>}
          </div>
          <div className="result-images">
            {images?.map((image) => (
              <figure className="image">
                <a onClick={(e) => add(image, e)}>
                  {/* <span className="material-symbols-outlined">heart_check</span> */}
                  <span className="material-symbols-outlined">favorite</span>
                </a>
                <img src={image.link} alt={image.title} />
              </figure>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
