import { useContext } from "react";
import { LikeImageContext } from "../contexts/LikeImageContext";
import { IImage } from "../models/IImage";
import { CloseIcon } from "../assets/icons/CloseIcon";
import { motion } from "framer-motion";

interface ImageViewerProps {
  image: IImage;
  onClose: () => void;
}

export const ImageViewer = ({ image, onClose }: ImageViewerProps) => {
  const { add, likedImages } = useContext(LikeImageContext);
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
        className="viewer"
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
        <div className="options">
          <h2>{image.title}</h2>
          <div className="options__buttons">
            {likedImages.some(
              (likedImage) => image.title === likedImage.image.title
            ) ? (
              <span>Already in list</span>
            ) : (
              <button className="button-round" onClick={() => add(image)}>
                Add to list
              </button>
            )}

            {/* TODO: get original link */}
            <a
              href={image.link}
              className="button-round"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to the original page
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
