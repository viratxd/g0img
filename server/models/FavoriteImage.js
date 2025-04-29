const mongoose = require("mongoose");

const FavoriteImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  image: {
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: {
      contextLink: { type: String, required: true },
      height: { type: Number, required: true },
      width: { type: Number, required: true },
    },
  },
});

const FavoriteImage = mongoose.model(
  "FavoriteImage",
  FavoriteImageSchema,
  "favorite_images"
);

module.exports = FavoriteImage;
