const express = require("express");
const router = express.Router();
const { addFavoriteImage, getFavoriteImages, deleteFavoriteImage } = require("../controllers/images.controller");
const { validate } = require("../validate");
const {
  favoriteImageSchema,
} = require("../validators/favoriteImage.validator");

router.get("/:userName", getFavoriteImages);
router.post("/:userName", validate(favoriteImageSchema), addFavoriteImage);
router.delete("/:userName", deleteFavoriteImage);

module.exports = router;
