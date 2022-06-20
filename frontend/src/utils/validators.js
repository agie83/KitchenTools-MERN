import Joi from 'joi';

export const loginSchema = Joi.object({
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

export const registerSchema = Joi.object({
  firstName:
  Joi.string()
    .required().min(2).max(30)
    .messages({
      'string.min': 'Vezetéknév: Minumum 2 karakter',
      'string.max': 'Vezetéknév: Maximum 30 karakter',
      'string.empty': 'Keresztnév megadása kötelező',
      'any.required': 'Keresztnév megadása kötelező',
    }),
  lastName:
    Joi.string()
      .required().min(2).max(20)
      .messages({
        'string.min': 'Vezetéknév: Minumum 2 karakter',
        'string.max': 'Vezetéknév: Maximum 20 karakter',
        'string.empty': 'Vezetéknév megadása kötelező',
        'any.required': 'Vezetéknév megadása kötelező',
      }),
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
        .min(8)
        .required()
        .messages({
          'string.min': 'Jelszó: Minumum 8 karakter megadása kötelező',
          'string.empty': 'Jelszó megadása kötelező',
          'any.required': 'Jelszó megadása kötelező',

        }),
  passwordAgain:
      Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'string.empty': 'Jelszó újbóli megadása kötelező',
          'any.required': 'Jelszó újbóli megadása kötelező',
          'any.only': 'A két jelszó eltér',
        }),
});

export const profileSchema = Joi.object({
  firstName:
  Joi.string()
    .required().min(2).max(30)
    .messages({
      'string.min': 'Vezetéknév: Minumum 2 karakter',
      'string.max': 'Vezetéknév: Maximum 30 karakter',
      'string.empty': 'Keresztnév megadása kötelező',
      'any.required': 'Keresztnév megadása kötelező',
    }),
  lastName:
    Joi.string()
      .required().min(2).max(20)
      .messages({
        'string.min': 'Vezetéknév: Minumum 2 karakter',
        'string.max': 'Vezetéknév: Maximum 20 karakter',
        'string.empty': 'Vezetéknév megadása kötelező',
        'any.required': 'Vezetéknév megadása kötelező',
      }),
});

export const passwordSchema = Joi.object({

  password:
      Joi.string()
        .min(8)
        .required()
        .messages({
          'string.min': 'Jelszó: Minumum 8 karakter megadása kötelező',
          'string.empty': 'Jelszó megadása kötelező',
          'any.required': 'Jelszó megadása kötelező',

        }),
  passwordAgain:
      Joi.string()
        .min(8)
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'string.min': 'Jelszó: Minumum 8 karakter megadása kötelező',
          'string.empty': 'Jelszó újbóli megadása kötelező',
          'any.required': 'Jelszó újbóli megadása kötelező',
          'any.only': 'A két jelszó eltér',
        }),
});
