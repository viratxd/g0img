import { motion } from "framer-motion";
import { Icon } from "../Icon";
import { LikeButtonWithText } from "./LikeButtonWithText";
import { IImage } from "../../models/IImage";

interface IImageActionMenu {
  image: IImage;
  onZoom: () => void;
  hoveredAction: string | null;
  onMouseEnter: (key: string) => void;
  onMouseLeave: () => void;
  mode: "add" | "remove";
  imageId?: string;
}

export const ImageActionMenu = ({
  image,
  onZoom,
  hoveredAction,
  onMouseEnter,
  onMouseLeave,
  mode,
  imageId,
}: IImageActionMenu) => {
  const actions = ["zoom", "like", "link"] as const;

  return (
    <>
      <div className="image__desktop">
        <div className="image__overlay">
          <motion.div className="image__menu">
            {actions.map((key) => {
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
                      onClick={onZoom}
                      layout
                      onMouseEnter={() => onMouseEnter(key)}
                      onMouseLeave={onMouseLeave}
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
                      isIcon={true}
                      isMobile={false}
                      isDimmed={isDimmed}
                      onMouseEnter={() => onMouseEnter(key)}
                      onMouseLeave={onMouseLeave}
                      mode={mode}
                      imageId={imageId}
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
                      onMouseEnter={() => onMouseEnter(key)}
                      onMouseLeave={onMouseLeave}
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
      </div>
      {/* Mobile view */}
      <div className="image__mobile">
        <button className="image__mobile__button" onClick={onZoom}>
          <Icon name={"zoomIn"} width={24} height={24} fill="#222" />
        </button>
        <LikeButtonWithText
          image={image}
          isIcon={true}
          isMobile={true}
          mode={mode}
          imageId={imageId}
        />
        <a
          className="image__mobile__button"
          href={image.image.contextLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name={"openInNew"} width={24} height={24} fill="#222" />
        </a>
      </div>
    </>
  );
};
