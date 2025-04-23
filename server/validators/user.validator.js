const Joi = require("joi");

const userCreateSchema = Joi.object({
  email: Joi.string().required(),
  auth0Id: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  userId: Joi.string().required(),
  userName: Joi.string().required(),
});

module.exports = { userCreateSchema, userUpdateSchema };
