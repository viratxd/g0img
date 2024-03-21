const express = require("express");
const router = express.Router();
const { getUser, postUser } = require("../controllers/user.controller");
const { putImages } = require("../controllers/images.controller");
const { validate } = require("../validate");
const { userSchema } = require("../schemas/user.schema");
const { favoriteImageSchema } = require("../schemas/favoriteImage.schema");

router.get("/:userName", getUser)
router.post("/:userName", validate(userSchema), postUser)
router.put("/:userName", validate(favoriteImageSchema), putImages)

module.exports = router