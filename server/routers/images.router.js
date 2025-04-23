const express = require("express");
const router = express.Router();
const { addFavoriteImage, getFavoriteImages, deleteFavoriteImage } = require("../controllers/images.controller");
const { validate } = require("../validate");
const {
  favoriteImageSchema,
} = require("../validators/favoriteImage.validator");

router.get("/", getFavoriteImages);
router.post("/", validate(favoriteImageSchema), addFavoriteImage);
router.delete("/:userName", deleteFavoriteImage);

module.exports = router;
