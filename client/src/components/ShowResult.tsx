import { IImage } from "../models/IImage";
import { getImages } from "../services/imageService";

interface IShowResultProps {
  searchTime: string;
  correctedQuery: string;
  images: IImage[];
  isLoading: boolean;
}

export const ShowResult = ({
  searchTime,
  correctedQuery,
  images,
  isLoading,
}: IShowResultProps) => {
  return (
    <>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <section>
          {searchTime ? <p>{searchTime}sec</p> : <></>}
          {correctedQuery ? (
            <p>
              Did you mean
              <a onClick={() => getImages(correctedQuery)}>
                {correctedQuery}
              </a>
              ?
            </p>
          ) : (
            <></>
          )}
          {images?.map((image) => (
            <figure>
              <img src={image.link} alt={image.title} />
            </figure>
          ))}
        </section>
      )}
    </>
  );
};
