const User = require("../models/User");
const FavoriteImage = require("../models/FavoriteImage");

const getFavoriteImages = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: `User ${userId} not found` });
    }

    const favoriteImages = await FavoriteImage.find({
      userId: userId,
    });

    res.status(200).json(favoriteImages);
  } catch (error) {
    console.error("Error getting favorite images:", error);
    res.status(500).json({ error: "Error getting favorite images" });
  }
};

const addFavoriteImage = async (req, res) => {
  try {
    const { userId, image } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: `User ${req.body.userId} not found` });
    }

    const favoriteImage = {
      userId,
      image,
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
    const { userId, imageId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: `User ${req.params.userName} not found` });
    }

    await FavoriteImage.deleteOne({ _id: imageId });

    res.status(200).json({ message: "Favorite images deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite images:", error);
    res.status(500).json({ error: "Error deleting favorite images" });
  }
};

module.exports = { addFavoriteImage, getFavoriteImages, deleteFavoriteImage };
