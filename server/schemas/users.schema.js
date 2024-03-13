const Joi = require("joi");

const usersSchema = Joi.object({
  isAuthenticated: Joi.boolean().invalid(false).required(),
  userId: Joi.string().min(6).required(),
  userName: Joi.string().min(3).required()
});

module.exports = { usersSchema };
