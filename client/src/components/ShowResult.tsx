import { IImage } from "../models/IImage";

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

  return (
    <>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <section>
          {searchTime ? <p>{searchTime}sec</p> : <></>}
          {correctedQuery ? (
            <p>Did you mean <a onClick={() => search(correctedQuery)}>{correctedQuery}</a> ?</p>
          ) : (
            <></>
          )}
          {searchWord && !correctedQuery ? (
            <h3>Result for: <em>{searchWord}</em></h3>
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
