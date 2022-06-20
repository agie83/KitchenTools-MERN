import HttpError from '../_utils/HttpError';
import StoreModel from './store-model';

class StoreService {
  static async getStores() {
    let stores;
    try {
      stores = await StoreModel.find();
    } catch (err) {
      throw new HttpError('Database error', 400);
    }
    return stores;
  }
}

export default StoreService;
