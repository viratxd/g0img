const User = require("../models/User");
const FavoriteImage = require("../models/FavoriteImage");
const { log } = require("console");

const getFavoriteImages = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });

    if (!user) {
      return res
        .status(404)
        .json({ error: `User ${req.params.userName} not found` });
    }

    const favoriteImages = await FavoriteImage.find({ userId: user._id });

    res.status(200).json(favoriteImages);
  } catch (error) {
    console.error("Error getting favorite images:", error);
    res.status(500).json({ error: "Error getting favorite images" });
  }
};

const addFavoriteImage = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });

    if (!user) {
      return res
        .status(404)
        .json({ error: `User ${req.params.userName} not found` });
    }

    const favoriteImage = {
      userId: user._id,
      image: req.body,
    };

    await FavoriteImage.insertOne(favoriteImage);

    res.status(200).json({ message: "Favorite images updated successfully" });
  } catch (error) {
    console.error("Error updating favorite images:", error);
    res.status(500).json({ error: "Error updating favorite images" });
  }
};

const deleteFavoriteImage = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });

    if (!user) {
      return res
        .status(404)
        .json({ error: `User ${req.params.userName} not found` });
    }

    await FavoriteImage.deleteOne({ _id: req.body.imageId });

    res.status(200).json({ message: "Favorite images deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite images:", error);
    res.status(500).json({ error: "Error deleting favorite images" });
  }
};

module.exports = { addFavoriteImage, getFavoriteImages, deleteFavoriteImage };
