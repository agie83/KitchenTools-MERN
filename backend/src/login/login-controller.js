import LoginService from './login-service';

export default class LoginController {
  static async post(req, res, next) {
    try {
      const token = await LoginService.getJwtToken(req.body);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
