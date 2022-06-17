import mongoose from 'mongoose';
import logger from '../logger';
import UserSchema from './user-model';
import HttpError from '../_utils/HttpError';

class UserService {
  static async getUserDataById(id) {
    return UserSchema.findById(id, { password: 0 });
  }

  static async patchUserData(req) {
    const newData = req.body;
    if (Object.keys(newData).length === 0 || newData === undefined) {
      throw new HttpError('Hiányzó adat', 401);
    }

    const currentData = await this.getUserDataById(req.user.id);
    if ((newData.firstName === '' && newData.lastName !== '')
    || (newData.firstName !== '' && newData.lastName === '')
    || (newData.firstName === '' && newData.lastName === '')) {
      throw new HttpError('Mindkét mező kitöltése kötelező, teljes név megadása szükséges!', 400);
    }

    if ((newData.password === '' && newData.passwordAgain !== '')
    || (newData.password !== '' && newData.passwordAgain === '')
    || (newData.password === '' && newData.passwordAgain === '')) {
      throw new HttpError('Jelszó módosításához mindkét mező megadása kötelező!', 400);
    }

    if (newData.password !== newData.passwordAgain) {
      throw new HttpError('A két jelszó eltér', 400);
    }

    Object.keys(newData).forEach((key) => {
      if (currentData[key] !== newData[key]) {
        currentData[key] = newData[key];
      }
    });

    try {
      await currentData.save();
      return currentData;
    } catch (err) {
      if (!(err instanceof mongoose.Error)) throw err;
      const { errors } = err;
      const httpError = new HttpError('Mongoose error', 400);
      const fieldNameHU = {
        firstName: 'Keresztnév',
        lastName: 'Vezetéknév',
        password: 'Jelszó',
      };
      const requiredFieldNames = Object.keys(errors).filter(
        (key) => errors[key].kind === 'required',
      );
      if (requiredFieldNames.length === 1) {
        logger.error(errors[requiredFieldNames[0]]);
        const fieldName = requiredFieldNames[0];
        throw httpError.setMessage(`${fieldNameHU[fieldName]} megadása kötelező.`);
      }
      if (requiredFieldNames.length > 1) {
        const requiredFieldNamesHU = requiredFieldNames.map((field) => fieldNameHU[field]);
        const [lastFieldName, ...otherFieldNames] = requiredFieldNamesHU;
        throw httpError.setMessage(`${otherFieldNames.join(', ')} és ${lastFieldName} megadása kötelező.`);
      }
      const wrongField = Object.values(errors)[0];
      throw httpError.setMessage(wrongField.message);
    }
  }
}

export default UserService;
