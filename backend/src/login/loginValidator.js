import Joi from 'joi';

const loginSchema = Joi.object({
  email:
      Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
          'string.email': 'Érvénytelen e-mail cím',
          'string.empty': 'Email cím megadása kötelező',
          'any.required': 'Email cím megadása kötelező',
        }),
  password:
      Joi.string()
        .required()
        .messages({
          'string.empty': 'Jelszó megadása kötelező',
          'any.required': 'Jelszó megadása kötelező',
        }),
});

export default loginSchema;
