import { useContext, useEffect, useState } from "react";
import { ImageActionMenu } from "../components/ui/ImageActionMenu";
import { IImage } from "../models/IImage";
import { AnimatePresence } from "framer-motion";
import { ImageViewer } from "../components/ImageViewer";
import { getImagesFromDB } from "../services/imageService";
import { UserContext } from "../contexts/UserContext";
import { IFavoriteImage } from "../models/IFavoriteImage";

export const Favorite = () => {
  const { id } = useContext(UserContext);
  const [likedImages, setLikedImages] = useState<IFavoriteImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchImages = async () => {
      const images = await getImagesFromDB(id);
      if (images) {
        setLikedImages(images);
      }
    };

    fetchImages();
  }, [id]);

  const handleMouseEnter = (key: string) => {
    setHoveredAction(key);
  };

  const handleMouseLeave = () => {
    setHoveredAction(null);
  };

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

  // FIXME: When image is removed, remove visually from the list immediately
  return (
    <div className="favorite">
      {likedImages.length === 0 ? (
        <p>No favorite images yet.</p>
      ) : (
        <div className="images">
          {likedImages.map((image) => (
            <>
              <figure key={image._id} className="image">
                <img src={image.image.link} alt={image.image.title} />
                <ImageActionMenu
                  image={image.image}
                  imageId={image._id}
                  onZoom={() => setSelectedImage(image.image)}
                  hoveredAction={hoveredAction}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  mode="remove"
                />
              </figure>
              <AnimatePresence>
                {selectedImage && (
                  <ImageViewer
                    image={selectedImage}
                    onClose={handleCloseViewer}
                    mode="remove"
                    imageId={image._id}
                  />
                )}
              </AnimatePresence>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
