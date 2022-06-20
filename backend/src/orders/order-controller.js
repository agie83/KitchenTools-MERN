import OrderService from './order-service';

class OrderController {
  static async get(req, res, next) {
    try {
      const orders = await OrderService.getOrders(req.user.id, req.body);
      res.status(200).json({ orders });
    } catch (e) {
      next(e);
    }
  }

  static async updateMany(req, res, next) {
    try {
      const newOrders = await OrderService.setStatusToOrdered(req.user.id);
      res.status(200).send({ orders: newOrders });
    } catch (e) {
      next(e);
    }
  }
}

export default OrderController;
