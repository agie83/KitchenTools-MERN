import RegisterService from './register-service';

export default class RegisterController {
  static async create(req, res, next) {
    try {
      const user = await RegisterService.addUser(req.body);
      res.status(200).send({ user });
    } catch (err) {
      next(err);
    }
  }
}
