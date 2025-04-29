const Joi = require("joi");

const addedImageSchema = Joi.object({
  userId: Joi.string().required(),
  image: Joi.object({
    title: Joi.string().max(255).required(),
    link: Joi.string().uri().required(),
    image: Joi.object({
      contextLink: Joi.string().uri().required(),
      height: Joi.number().required(),
      width: Joi.number().required(),
    })
  }).required(),
});

const removedImageSchema = Joi.object({
  userId: Joi.string().required(),
  imageId: Joi.string().required(),
});

module.exports = { addedImageSchema, removedImageSchema };
