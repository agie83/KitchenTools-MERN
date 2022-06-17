import UserService from './user-service';

class UserController {
  static async get(req, res, next) {
    try {
      const data = await UserService.getUserDataById(req.user.id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async patch(req, res, next) {
    try {
      const data = await UserService.patchUserData(req, res, next);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
