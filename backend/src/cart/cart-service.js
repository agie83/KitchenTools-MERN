import mongoose from 'mongoose';
import OrderModel from '../orders/order-model';
import HttpError from '../_utils/HttpError';
import UserSchema from '../user/user-model';
import ProductModel from '../products/product-model';

const { ObjectId } = mongoose.Types;

class CartService {
  static async getCartItems(userId) {
    return OrderModel.find({ userId, status: 'pending' });
  }

  static async updateCartItemQty({ orderId, qty }) {
    let orderRow;
    try {
      if (qty > 0) {
        orderRow = await OrderModel.findOneAndUpdate({ _id: orderId, status: 'pending' }, { qty }, { new: true });
      }
      if (qty === 0) {
        orderRow = await OrderModel.findOneAndDelete({ _id: orderId, status: 'pending' });
      }
    } catch (err) {
      throw new HttpError('Database error', 400);
    }
    return orderRow;
  }

  static async addToCart({ userId }, { productId, qty }) {
    if (productId === undefined || productId === '') throw new HttpError('Product ID is required.', 400);

    if (!ObjectId.isValid(userId)) throw new HttpError('User ID is not valid.', 404);
    if (!ObjectId.isValid(productId)) throw new HttpError('Product ID is not valid.', 404);

    let user;
    try {
      user = await UserSchema.findById(userId);
    } catch (err) {
      throw new HttpError('Database error.', 400);
    }
    if (!user) throw new HttpError('User doesn\'t exist.', 400);

    let product;
    try {
      product = await ProductModel.findById(productId);
    } catch (err) {
      throw new HttpError('Database error.', 400);
    }
    if (!product) throw new HttpError('Product doesn\'t exist.', 400);

    const order = {
      status: 'pending',
      name: product.name,
      price: product.price,
      image: product.images[0],
      userId,
      productId,
      qty,
    };

    let dbOrder;
    try {
      dbOrder = await OrderModel.create(order);
    } catch (err) {
      throw new HttpError('Database error.', 400);
    }
    return dbOrder;
  }

  static async deleteFullCart(userId) {
    if (!ObjectId.isValid(userId)) throw new HttpError('Invalid order id!', 400);
    const orders = await OrderModel.deleteMany({ userId, status: 'pending' });
    return orders.matchedCount;
  }
}

export default CartService;
