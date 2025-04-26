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
    <div className="overlay">
      <div className="viewer">
        <motion.button
          className="close-button"
          onClick={onClose}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <CloseIcon />
        </motion.button>
        <div className="main-image">
          <img src={image.link} alt={image.title} />
        </div>
        <div className="options">
          <h2>{image.title}</h2>
          {likedImages.some(
            (likedImage) => image.title === likedImage.image.title
          ) ? (
            <span>Already in list</span>
          ) : (
            <button className="primary-button" onClick={() => add(image)}>
              Add to list
            </button>
          )}

          {/* TODO: get original link */}
          <a href={image.link} target="_blank" rel="noopener noreferrer">
            Go to the original page
          </a>
        </div>
      </div>
    </div>
  );
};
