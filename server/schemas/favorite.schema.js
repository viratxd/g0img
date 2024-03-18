const Joi = require("joi");

// const favoriteSchema = Joi.array([
//   Joi.object({
//     title: Joi.string().required(),
//     link: Joi.string(),
//   }),
// ]);

const favoriteSchema = Joi.object({
  kind: Joi.string().valid("customsearch#result").required(),
  title: Joi.string().required(),
  htmlTitle: Joi.string(),
  link: Joi.string(),
  displayLink: Joi.string(),
  snippet: Joi.string(),
  htmlSnippet: Joi.string(),
  mime: Joi.string(),
  fileFormat: Joi.string(),
  image: Joi.object(
    {
      contextLink: Joi.string(),
      height: Joi.number(),
      width: Joi.number(),
      byteSize: Joi.number(),
      thumbnailLink: Joi.string(),
      thumbnailHeight: Joi.number(),
      thumbnailWidth: Joi.number(),
    }
  )
});

module.exports = { favoriteSchema };
