const Joi = require("joi");

const favoriteImageSchema = Joi.object({
  userName: Joi.string().required(),
  imageData: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        link: Joi.string().required(),
      })
    )
    .required(),
});

module.exports = { favoriteImageSchema };
