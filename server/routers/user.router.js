const express = require("express");
const router = express.Router();
const { getUser, postUser } = require("../controllers/user.controller");
const { validate } = require("../validate");
const { userSchema } = require("../validators/user.validator");

router.get("/", getUser);
router.post("/", postUser);

module.exports = router;
