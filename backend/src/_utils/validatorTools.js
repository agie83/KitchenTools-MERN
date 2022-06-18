import validator from 'validator';

const registerValidator = {
  lastName: [
    {
      validityFn: (string) => !validator.isEmpty(string),
      errorMessage: 'Vezetéknév megadása kötelező!',
    },
    {
      validityFn: (string) => validator.isLength(string, { min: 2 }),
      errorMessage: 'Vezetéknév minimum 2 karakter!',
    },
    {
      validityFn: (string) => validator.isLength(string, { max: 20 }),
      errorMessage: 'Vezetéknév maximum 20 karakter!',
    },
  ],
  firstName: [
    {
      validityFn: (string) => !validator.isEmpty(string),
      errorMessage: 'Keresztnév megadása kötelező!',
    },
    {
      validityFn: (string) => validator.isLength(string, { min: 2 }),
      errorMessage: 'Keresztnév minimum 2 karakter!',
    },
    {
      validityFn: (string) => validator.isLength(string, { max: 20 }),
      errorMessage: 'Keresztnév maximum 20 karakter!',
    },
  ],
  email: [
    {
      validityFn: (string) => !validator.isEmpty(string),
      errorMessage: 'Email cím megadása kötelező!',
    },
    {
      validityFn: (string) => validator.isEmail(string),
      errorMessage: 'Nem megfelelő email cím formátum',
    },
  ],
  password: [
    {
      validityFn: (string) => !validator.isEmpty(string),
      errorMessage: 'Jelszó megadása kötelező!',
    },
    {
      validityFn: (string) => validator.isStrongPassword(string),
      errorMessage: 'Nem elég erős jelszó!',
    },
  ],
  passwordAgain: [
    {
      validityFn: (string) => !validator.isEmpty(string),
      errorMessage: 'Jelszó újbóli megadása kötelező!',
    },
  ],
};

const comparePassword = (password, passwordAgain) => (password === passwordAgain);

function handleValidation(formData, validatorSchema) {
  const validationResult = Object.keys(formData).map((inputName) => {
    const inputValue = formData[inputName];
    const inputValidators = validatorSchema[inputName];
    const inputValidationResults = inputValidators
      .find((inputValidator) => {
        const { validityFn: validatorFn, errorMessage: validatorErrorMessage } = inputValidator;
        const isValid = validatorFn(inputValue);
        return isValid ? '' : validatorErrorMessage;
      })?.errorMessage;
    if (inputValidationResults !== undefined) return inputValidationResults;
    return '';
  });

  const errors = validationResult.filter((msg) => msg.length > 0);

  if (formData.includes('passwordAgain') && !comparePassword(formData.password, formData.passwordAgain)) {
    return [...errors, 'A két jelszó eltér!'];
  }
  return (errors.length > 0) ? errors : true;
}
export { registerValidator, comparePassword, handleValidation };
