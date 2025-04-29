import { useContext, useEffect, useState } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import { IImage } from "../models/IImage";
import { CloseIcon } from "../assets/icons/CloseIcon";
import { AnimatePresence, motion } from "framer-motion";

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
          <CloseIcon />
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
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1.05,
                    backgroundColor: "#bbd3c8",
                    color: "#0b3823",
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
                  Image has been added!
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
