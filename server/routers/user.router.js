const express = require("express");
const router = express.Router();
const { getUser, postUser, putUser } = require("../controllers/user.controller");
const { validate } = require("../validate");
const { userCreateSchema, userUpdateSchema } = require("../validators/user.validator");

router.get("/", getUser);
router.post("/", validate(userCreateSchema), postUser);
router.put("/", validate(userUpdateSchema), putUser);

module.exports = router;
