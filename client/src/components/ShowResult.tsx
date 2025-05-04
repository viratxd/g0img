import { useState } from "react";
import { IImage } from "../models/IImage";
import { ImageViewer } from "./ImageViewer";
import { AnimatePresence } from "framer-motion";
import { ImageActionMenu } from "./ui/ImageActionMenu";

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
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const handleMouseEnter = (key: string) => {
    setHoveredAction(key);
  };

  const handleMouseLeave = () => {
    setHoveredAction(null);
  };

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

  /* TODO: Show related words? */

  return (
    <section className="result">
      <div className="result__info">
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
      <div className="result__images">
        {images?.map((image) => (
          <figure key={image.link} className="image">
            <img src={image.link} alt={image.title} />
            <ImageActionMenu
              image={image}
              onZoom={() => setSelectedImage(image)}
              hoveredAction={hoveredAction}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </figure>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <ImageViewer image={selectedImage} onClose={handleCloseViewer} />
        )}
      </AnimatePresence>

      <div ref={scrollRef} style={{ height: "1px" }}></div>
    </section>
  );
};
