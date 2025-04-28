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
      icon: <ZoomInIcon width={64} height={64} fill="#fff" />,
      onClick: () => setSelectedImage(image),
    },
    {
      key: "like",
      label: "Add to list",
      icon: <HeartPlusIcon width={64} height={64} fill="#fff" />,
      onClick: () => add(image),
    },
    {
      key: "link",
      label: "Go to the original page",
      icon: <OpenInNewIcon width={64} height={64} fill="#fff" />,
      href: image.image.contextLink,
    },
  ];


  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

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
              {/* <div className="image__menu">
                <motion.button
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <ZoomInIcon width={80} height={80} fill="#fff" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.5 }}
                  onClick={() => add(image)}
                >
                  <HeartPlusIcon width={64} height={64} fill="#fff" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.5 }}
                  href={image.image.contextLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OpenInNewIcon width={64} height={64} fill="#fff" />
                </motion.a>
              </div> */}
              <div className="image__menu">
                {getActions(image).map(({ key, label, icon, onClick, href }) =>
                  href ? (
                    <motion.a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      layout
                      onMouseEnter={() => setHoveredAction(key)}
                      onMouseLeave={() => setHoveredAction(null)}
                      animate={{
                        scale: hoveredAction === key ? 1.3 : 1,
                        opacity:
                          hoveredAction && hoveredAction !== key ? 0.5 : 1,
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
                      onMouseEnter={() => setHoveredAction(key)}
                      onMouseLeave={() => setHoveredAction(null)}
                      animate={{
                        scale: hoveredAction === key ? 1.3 : 1,
                        opacity:
                          hoveredAction && hoveredAction !== key ? 0.5 : 1,
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
              </div>
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
