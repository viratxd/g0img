const Joi = require("joi");

const userSchema = Joi.object({
  isAuthenticated: Joi.boolean().invalid(false).required(),
  userIdWithGoogle: Joi.string().allow("").required(),
  userIdWithGithub: Joi.string().allow("").required(),
  userName: Joi.string().min(3).required()
});

module.exports = { userSchema };
