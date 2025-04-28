import { useContext, useState } from "react";
import { IImage } from "../models/IImage";
import { ImageViewer } from "./ImageViewer";
import { AnimatePresence, motion } from "framer-motion";
import { LikeImageContext } from "../contexts/LikeImageContext";
import { ZoomInIcon } from "../assets/icons/ZoomInIcon";
import { HeartPlusIcon } from "../assets/icons/HeartPlusIcon";
import { OpenInNewIcon } from "../assets/icons/OpenInNewIcon";

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
  const { add } = useContext(LikeImageContext);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const getActions = (image: IImage) => [
    {
      key: "zoom",
      label: "Show details",
      icon: <ZoomInIcon width={56} height={56} fill="#fff" />,
      onClick: () => setSelectedImage(image),
    },
    {
      key: "like",
      label: "Add to list",
      icon: <HeartPlusIcon width={56} height={56} fill="#fff" />,
      onClick: () => add(image),
    },
    {
      key: "link",
      label: "Go to the original page",
      icon: <OpenInNewIcon width={56} height={56} fill="#fff" />,
      href: image.image.contextLink,
    },
  ];

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
              {/* TODO: Fix hover problem */}
              <motion.div className="image__menu">
                {getActions(image).map(({ key, label, icon, onClick, href }) =>
                  href ? (
                    <motion.a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      layout
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                      animate={{
                        scale: hoveredAction === key ? 1.5 : 1,
                        opacity:
                          hoveredAction && hoveredAction !== key ? 0.2 : 1,
                        position: hoveredAction === key ? "absolute" : "static",
                        zIndex: hoveredAction === key ? 2 : 1,
                      }}
                      className="icon-button"
                    >
                      {icon}
                      {hoveredAction === key && (
                        <span className="icon-label">{label}</span>
                      )}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={key}
                      onClick={onClick}
                      layout
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                      animate={{
                        scale: hoveredAction === key ? 1.5 : 1,
                        opacity:
                          hoveredAction && hoveredAction !== key ? 0.2 : 1,
                        position: hoveredAction === key ? "absolute" : "static",
                        zIndex: hoveredAction === key ? 2 : 1,
                      }}
                      className="icon-button"
                    >
                      {icon}
                      {hoveredAction === key && (
                        <span className="icon-label">{label}</span>
                      )}
                    </motion.button>
                  )
                )}
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
