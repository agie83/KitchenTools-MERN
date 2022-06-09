import jwt from 'jsonwebtoken';
import UserSchema from '../user/user-model';
import config from '../config';
import loginSchema from './loginValidator';
import HttpError from '../_utils/HttpError';

export default class LoginService {
  static handleValidation(data) {
    const result = loginSchema.validate(data, { abortEarly: false });
    const { error } = result;
    if (error) {
      const errorArray = result.error.message.split('.');
      return errorArray;
    }
    return true;
  }

  static async getUserByEmail(email) {
    return UserSchema.findOne({ email });
  }

  static createJwt(user) {
    const payload = {
      id: user._id.toString(),
      firstName: user.firstName,
      roles: ['user'],
    };
    if (user.isAdmin) payload.roles = ['admin', ...payload.roles];
    return jwt.sign(payload, config.jwtSecret);
  }

  static async getJwtToken(request) {
    const { email, password } = request;

    const validation = this.handleValidation({ email, password });
    if (validation !== true) throw new HttpError(validation, 401);

    let user;
    try {
      user = await this.getUserByEmail(email);
    } catch (err) {
      throw new HttpError('Szerverhiba', 500);
    }

    let correctPwd;
    try {
      correctPwd = await user?.comparePassword(password);
    } catch (err) {
      throw new HttpError('Szerverhiba', 500);
    }

    if (correctPwd) return this.createJwt(user);
    throw new HttpError('Nem megfelelő email cím vagy jelszó ', 401);
  }
}
