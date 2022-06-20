import StoreService from './store-service';

class StoreController {
  static async get(req, res, next) {
    try {
      const stores = await StoreService.getStores();
      res.status(200).json({ stores });
    } catch (e) {
      next(e);
    }
  }
}

export default StoreController;
