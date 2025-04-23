const express = require("express");
const router = express.Router();
const {
  addFavoriteImage,
  getFavoriteImages,
  deleteFavoriteImage,
} = require("../controllers/images.controller");
const { validate } = require("../validate");
const {
  addedImageSchema,
  removedImageSchema,
} = require("../validators/favoriteImage.validator");

router.get("/", getFavoriteImages);
router.post("/", validate(addedImageSchema), addFavoriteImage);
router.delete("/", validate(removedImageSchema), deleteFavoriteImage);

module.exports = router;
