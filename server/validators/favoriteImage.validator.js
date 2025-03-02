const Joi = require("joi");

const favoriteImageSchema = Joi.object({
  title: Joi.string().max(255).required(),
  link: Joi.string().uri().required(),
})
.required();

module.exports = { favoriteImageSchema };
