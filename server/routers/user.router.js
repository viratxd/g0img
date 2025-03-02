const express = require("express");
const router = express.Router();
const { getUser, postUser } = require("../controllers/user.controller");
const { validate } = require("../validate");
const { userSchema } = require("../validators/user.validator");

router.get("/:userName", getUser);
router.post("/:userName", validate(userSchema), postUser);

module.exports = router;
