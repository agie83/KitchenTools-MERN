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

  static async post(req, res, next) {
    try {
      const response = await OrderService.addToCart(req.params, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const isDeleted = await OrderService.deleteOrder(req.params.orderId, req.user.id);
      const message = isDeleted ? 'Deleted successfully' : 'Already deleted';
      res.status(200).send({ message });
    } catch (e) {
      next(e);
    }
  }

  static async deleteMany(req, res, next) {
    try {
      const amountDeleted = await OrderService.deleteAllOrder(req.user.id);
      const message = amountDeleted === 0 ? 'Already deleted' : `Deleted ${amountDeleted} orders successfully`;
      res.status(200).send({ message });
    } catch (e) {
      next(e);
    }
  }

  static async updateMany(req, res, next) {
    try {
      const newOrders = await OrderService.setStatusToPaid(req.user.id);
      res.status(200).send({ orders: newOrders });
    } catch (e) {
      next(e);
    }
  }
}

export default OrderController;
