import jwt from 'jsonwebtoken';
import UserSchema from '../user/user-model';
import config from '../config';
import HttpError from '../_utils/HttpError';
import { loginValidator, handleValidation } from '../_utils/validatorTools';

export default class LoginService {
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
    if (Object.keys(request).length === 0) {
      throw new HttpError('Minden mező kitöltése kötelező!', 401);
    }
    if (!('password' in request)) {
      throw new HttpError('Jelszó megadása kötelező!', 401);
    }
    if (!('email' in request)) {
      throw new HttpError('Email cím megadása kötelező!', 401);
    }

    const { email, password } = request;

    const validation = handleValidation(request, loginValidator);
    if (validation !== true) {
      validation.filter((msg) => msg !== '');
      throw new HttpError(validation, 400);
    }
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
    throw new HttpError('Nem megfelelő email cím vagy jelszó', 401);
  }
}
