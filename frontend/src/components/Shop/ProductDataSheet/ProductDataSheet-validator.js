import Joi from 'joi';

const dataSheetSchema = Joi.object({
  qty:
      Joi.number()
        .greater(0)
        .required()
        .messages({
          'number.base': 'Adj meg egy számot!',
          'number.greater': 'Adj meg nullánál nagyobb mennyiséget!',
          'number.empty': 'Mennyiség megadása kötelező!',
          'any.required': 'Mennyiség megadása kötelező!',
        }),
});

export default dataSheetSchema;
