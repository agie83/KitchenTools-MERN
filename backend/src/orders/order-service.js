import mongoose from 'mongoose';
import OrderModel from './order-model';
import HttpError from '../_utils/HttpError';

const { ObjectId } = mongoose.Types;

class OrderService {
  static async getOrders(userId) {
    const paidOrders = OrderModel.find({ userId, status: { $ne: 'pending' } });

    const orderGroups = (await paidOrders).reduce((acc, curr) => {
      const result = { ...acc };
      result[curr.orderDate] = (acc[curr.orderDate] || []);
      result[curr.orderDate] = [...result[curr.orderDate], curr];
      return result;
    }, []);
    return orderGroups;
  }

  static async setStatusToOrdered(userId) {
    if (!ObjectId.isValid(userId)) throw new HttpError('Invalid user id!', 400);
    const orderDate = new Date();
    let orders;
    try {
      orders = await OrderModel.updateMany({ userId, status: 'pending' }, { status: 'ordered', orderDate });
    } catch (err) {
      throw new HttpError('Database error.', 400);
    }
    return orders;
  }
}

export default OrderService;
