import Joi from 'joi';

const dataSheetSchema = Joi.object({
  qty:
      Joi.string()
        .required()
        .messages({
          'string.empty': 'Email cím megadása kötelező',
          'any.required': 'Email cím megadása kötelező',
        }),
});

export default dataSheetSchema;
