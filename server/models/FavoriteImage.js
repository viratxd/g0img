const mongoose = require("mongoose");

const FavoriteImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  image: {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
});

const FavoriteImage = mongoose.model(
  "FavoriteImage",
  FavoriteImageSchema,
  "favorite_images"
);

module.exports = FavoriteImage;
