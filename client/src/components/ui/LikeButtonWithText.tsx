import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IImage } from "../../models/IImage";
import { LikeImageContext } from "../../contexts/LikeImageContext";
import { HandsUp } from "../../assets/HandsUp";
import { Icon } from "../Icon";

interface ILikeButtonWithText {
  key?: string;
  image: IImage;
  isIcon: boolean;
  isMobile: boolean;
  isHovered?: boolean;
  isDimmed?: boolean | "" | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  mode: "add" | "remove";
  imageId?: string;
}
export const LikeButtonWithText = ({
  key,
  image,
  isIcon,
  isMobile,
  isHovered,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  mode,
  imageId,
}: ILikeButtonWithText) => {
  const { add, remove, likedImages } = useContext(LikeImageContext);
  const [justAdded, setJustAdded] = useState(false);
  const alreadyLiked = likedImages.some(
    (likedImage) => image.title === likedImage.image.title
  );
  const animateProps = {
    scale: isHovered ? 1.5 : 1,
    opacity: isDimmed ? 0.2 : 1,
    zIndex: isHovered ? 2 : 1,
  };

  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => {
        setJustAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  // Add mode
  if (mode === "add") {
    // ImageViewer
    if (!isIcon) {
      return (
        <AnimatePresence mode="wait" key={key}>
          {justAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 10, scale: 1.05 }}
              animate={{ opacity: 1, y: 0, scale: 1.05 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: "0.8rem 1.2rem",
                borderRadius: "75px",
                fontWeight: 600,
                fontSize: "0.95rem",
                backgroundColor: "#353434",
                color: "#e1ded9",
                display: "inline-block",
              }}
            >
              Image has been added 🙌
            </motion.span>
          ) : alreadyLiked ? (
            <motion.span
              className="button-round"
              key="already"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "0.8rem 1.2rem",
                borderRadius: "75px",
                fontWeight: 600,
                fontSize: "0.95rem",
                backgroundColor: "#353434",
                color: "#e1ded9",
                display: "inline-block",
              }}
            >
              Already in list
            </motion.span>
          ) : (
            <motion.button
              className="button-round"
              onClick={() => {
                add(image);
                setJustAdded(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              Add to list
            </motion.button>
          )}
        </AnimatePresence>
      );
    }

    // ShowResult
    return !isMobile ? (
      <AnimatePresence mode="wait" key={key}>
        {justAdded ? (
          <motion.button
            key="added"
            className="icon-button"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1.05 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <HandsUp width={56} height={56} />
            <span className="icon-label">Image added!</span>
          </motion.button>
        ) : alreadyLiked ? (
          <motion.button
            className="icon-button"
            layout
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            animate={animateProps}
          >
            <Icon width={56} height={56} fill="#d88787" name="favorite" />
            {isHovered && <span className="icon-label">Already in list</span>}
          </motion.button>
        ) : (
          <motion.button
            onClick={() => {
              add(image);
              setJustAdded(true);
            }}
            layout
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            animate={animateProps}
            className="icon-button"
          >
            <Icon width={56} height={56} fill="#fff" name="heartPlus" />
            {isHovered && <span className="icon-label">Add to list</span>}
          </motion.button>
        )}
      </AnimatePresence>
    ) : 
    /* Mobile view */
    alreadyLiked ? (
      <span className="image__mobile__button">
        <Icon name={"favorite"} width={24} height={24} fill="#d88787" />
      </span>
    ) : (
      <button onClick={() => add(image)} className="image__mobile__button">
        <Icon name={"heartPlus"} width={24} height={24} fill="#222" />
      </button>
    );
  }

  // Remove mode
  if (mode === "remove" && imageId) {
    // ImageViewer
    if (!isIcon) {
      return (
        <AnimatePresence mode="wait" key={key}>
          <motion.button
            className="button-round"
            onClick={() => remove(imageId)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            Remove from list
          </motion.button>
        </AnimatePresence>
      );
    }
    // Favorite
    return !isMobile ? (
      <AnimatePresence mode="wait" key={key}>
        <motion.button
          onClick={() => remove(imageId)}
          layout
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          animate={animateProps}
          className="icon-button"
        >
          <Icon width={56} height={56} fill="#fff" name="heartMinus" />
          {isHovered && <span className="icon-label">Remove from list</span>}
        </motion.button>
      </AnimatePresence>
    ) : (
      /* Mobile view */
      <button onClick={() => remove(imageId)} className="image__mobile__button">
        <Icon name="heartMinus" width={24} height={24} fill="#222" />
      </button>
    );
  }
};
