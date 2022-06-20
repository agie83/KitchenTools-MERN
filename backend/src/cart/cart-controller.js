import CartService from './cart-service';

class CartController {
  static async get(req, res, next) {
    try {
      const cartItems = await CartService.getCartItems(req.user.id, req.body);
      res.status(200).json({ cartItems });
    } catch (e) {
      next(e);
    }
  }

  static async updateQty(req, res, next) {
    try {
      const response = await CartService.updateCartItemQty(req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async post(req, res, next) {
    try {
      const response = await CartService.addToCart(req.params, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMany(req, res, next) {
    try {
      const amountDeleted = await CartService.deleteFullCart(req.user.id);
      const message = amountDeleted === 0 ? 'Already deleted' : `Deleted ${amountDeleted} orders successfully`;
      res.status(200).send({ message });
    } catch (e) {
      next(e);
    }
  }
}

export default CartController;
