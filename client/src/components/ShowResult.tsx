import { useState } from "react";
import { IImage } from "../models/IImage";
import { ImageViewer } from "./ImageViewer";

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
  search,
  scrollRef,
}: IShowResultProps) => {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

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
            <img
              src={image.link}
              alt={image.title}
              onClick={() => setSelectedImage(image)}
            />
          </figure>
        ))}
      </div>
      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={handleCloseViewer} />
      )}

      <div ref={scrollRef} style={{ height: "1px" }}></div>
    </section>
  );
};
