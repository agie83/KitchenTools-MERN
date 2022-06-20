import mongoose from 'mongoose';
import User from '../user/user-model';
import logger from '../logger';
import HttpError from '../_utils/HttpError';
import { registerValidator, handleValidation } from '../_utils/validatorTools';

export default class RegisterService {
  static async addUser(userData) {
    const { email } = userData;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new HttpError('A megadott email cím már szerepel a rendszerünkben.', 400);

    const validation = handleValidation(userData, registerValidator);
    if (validation !== true) {
      validation.filter((msg) => msg !== '');
      throw new HttpError(validation, 400);
    }

    try {
      const docUser = new User(userData);
      const { _doc: { password, _id, ...otherProps } } = await docUser.save();
      return { ...otherProps, id: _id.toString() };
    } catch (err) {
      if (!(err instanceof mongoose.Error)) throw err;
      const { errors } = err;
      const httpError = new HttpError('Mongoose error', 400);
      const fieldNameHU = {
        firstName: 'Keresztnév',
        lastName: 'Vezetéknév',
        email: 'Email',
        password: 'Jelszó',
      };
      const requiredFieldNames = Object.keys(errors).filter(
        (key) => errors[key].kind === 'required',
      );
      if (requiredFieldNames.length === 1) {
        logger.error(errors[requiredFieldNames[0]]);
        const fieldName = requiredFieldNames[0];
        throw httpError.setMessage(`${fieldNameHU[fieldName]} megadása kötelező!`);
      }
      if (requiredFieldNames.length > 1) {
        const requiredFieldNamesHU = requiredFieldNames.map((field) => fieldNameHU[field]);
        const [lastFieldName, ...otherFieldNames] = requiredFieldNamesHU;
        logger.error(errors);
        throw httpError.setMessage(`${otherFieldNames.join(', ')} és ${lastFieldName} megadása kötelező!`);
      }
      const wrongField = Object.values(errors)[0];
      throw httpError.setMessage(wrongField.message);
    }
  }
}
