import { useEffect, useState } from "react";
import { IFavoriteImage } from "../models/IFavoriteImage";
import { IImage } from "../models/IImage";
import {
  addFavoriteImage,
  deleteFavoriteImage,
} from "../services/imageService";

export const useLikeImageHandler = (
  userId: string,
  initImages: IFavoriteImage[] = []
) => {
  const [likedImages, setLikedImages] = useState<IFavoriteImage[]>(initImages);

  useEffect(() => {
    setLikedImages(initImages);
  }, [initImages]);

  const add = (newLikedImage: IImage) => {
    const existingImages = likedImages.find(
      (image) => image.image.link === newLikedImage.link
    );

    if (existingImages) {
      window.alert("This image is already existing in your favorite list.");
      return;
    }

    const newFavoriteImage: IFavoriteImage = {
      _id: "",
      userId,
      image: {
        link: newLikedImage.link,
        title: newLikedImage.title,
        image: {
          contextLink: newLikedImage.image.contextLink,
          height: newLikedImage.image.height,
          width: newLikedImage.image.width,
        },
      },
    };

    addFavoriteImage(userId, newFavoriteImage.image);

    setLikedImages([...likedImages, newFavoriteImage]);
  };

  const remove = (imageId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this image from your list?"
    );

    if (confirm) {
      deleteFavoriteImage(userId, imageId)
        .then(() => {
          setLikedImages((prev) =>
            prev.filter((image) => image._id !== imageId)
          );
        })
        .catch((error) => {
          console.error("Error removing image from favorites", error);
        });
    }
  };

  return {
    likeImageContext: { likedImages, add, remove },
  };
};
