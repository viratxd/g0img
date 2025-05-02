import { useEffect, useState } from "react";
import { IImage } from "../models/IImage";
import { ImageViewer } from "./ImageViewer";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";
import { LikeButtonWithText } from "./ui/LikeButtonWithText";

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
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setJustAdded(false);
  }, [hoveredAction]);

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
            <img
              src={image.link}
              alt={image.title}
              onClick={() => setSelectedImage(image)}
            />
            <div className="image__overlay">
              <motion.div className="image__menu">
                {["zoom", "like", "link"].map((key) => {
                  const isHovered = hoveredAction === key;
                  const isDimmed = hoveredAction && hoveredAction !== key;
                  const animateProps = {
                    scale: isHovered ? 1.5 : 1,
                    opacity: isDimmed ? 0.2 : 1,
                    zIndex: isHovered ? 2 : 1,
                  };

                  switch (key) {
                    case "zoom":
                      return (
                        <motion.button
                          key={key}
                          onClick={() => setSelectedImage(image)}
                          layout
                          onMouseEnter={() => handleMouseEnter(key)}
                          onMouseLeave={handleMouseLeave}
                          animate={animateProps}
                          className="icon-button"
                        >
                          <Icon
                            width={56}
                            height={56}
                            fill={"#fff"}
                            name={"zoomIn"}
                          />
                          {isHovered && (
                            <span className="icon-label">Show details</span>
                          )}
                        </motion.button>
                      );

                    case "like":
                      return (
                        <LikeButtonWithText
                          key={key}
                          image={image}
                          isHovered={isHovered}
                          compact={true}
                          isDimmed={isDimmed}
                          onMouseEnter={() => handleMouseEnter(key)}
                          onMouseLeave={handleMouseLeave}
                        />
                      );

                    case "link":
                      return (
                        <motion.a
                          key={key}
                          href={image.image.contextLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          layout
                          onMouseEnter={() => handleMouseEnter(key)}
                          onMouseLeave={handleMouseLeave}
                          animate={animateProps}
                          className="icon-button"
                        >
                          <Icon
                            width={56}
                            height={56}
                            fill={"#fff"}
                            name={"openInNew"}
                          />
                          {isHovered && (
                            <span className="icon-label">
                              Go to the original page
                            </span>
                          )}
                        </motion.a>
                      );

                    default:
                      return null;
                  }
                })}
              </motion.div>
            </div>
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
