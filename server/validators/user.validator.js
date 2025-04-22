const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().required()
});

module.exports = { userSchema };
