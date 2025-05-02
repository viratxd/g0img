import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import { IImage } from "../models/IImage";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

interface ImageViewerProps {
  image: IImage;
  onClose: () => void;
}

export const ImageViewer = ({ image, onClose }: ImageViewerProps) => {
  const { add, likedImages } = useContext(LikeImageContext);
  const [justAdded, setJustAdded] = useState(false);

  const isPortrait = image.image.width < image.image.height;

  useEffect(() => {
    setJustAdded(false);
  }, [image]);

  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => {
        setJustAdded(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div
        className={`viewer ${isPortrait ? "portrait" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="close-button"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Close"
        >
          <Icon name={"close"} />
        </motion.button>

        <div className="main-image">
          <img src={image.link} alt={image.title} />
        </div>
        {/* TODO: Add source, like Google search etc. */}
        <div className="options">
          <h2>{image.title}</h2>
          <div className="options__buttons">
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                    backgroundColor: "#e1ded9",
                    color: "#353434",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1.05,
                    backgroundColor: "#353434",
                    color: "#e1ded9",
                  }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    padding: "0.8rem 1.2rem",
                    borderRadius: "75px",
                    fontWeight: 700,
                    display: "inline-block",
                    fontSize: "0.95rem",
                  }}
                >
                  Image has been added 🙌
                </motion.span>
              ) : likedImages.some(
                  (likedImage) => image.title === likedImage.image.title
                ) ? (
                <motion.span
                  key="already"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: "0.8rem 1.2rem",
                    borderRadius: "75px",
                    fontWeight: 600,
                    display: "inline-block",
                    fontSize: "0.95rem",
                    backgroundColor: "#353434",
                    color: "#e1ded9",
                  }}
                >
                  Already in list
                </motion.span>
              ) : (
                <motion.button
                  key="add"
                  className="button-round"
                  whileHover={{ scale: 1.05, opacity: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    add(image);
                    setJustAdded(true);
                  }}
                >
                  Add to list
                </motion.button>
              )}
              <motion.a
                href={image.image.contextLink}
                whileHover={{ scale: 1.05, opacity: 0.9 }}
                whileTap={{ scale: 0.95 }}
                className="button-round"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to the original page
              </motion.a>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
