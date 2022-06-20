import ShopService from './shop-service';

class ShopController {
  static async getCategories(req, res, next) {
    try {
      const categories = await ShopService.getAllCategories();
      res.status(200).json({ categories, qp: req.params.slug + req.query.category });
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryProducts(req, res, next) {
    let category;
    let categoryId;
    const filter = (req.query.category) ? req.query.category : '';
    const slugParam = ((req.params.slug) && req.params.slug !== 'filter') ? req.params.slug : '';
    const categorySlug = filter || slugParam;

    try {
      category = await ShopService.getCategoryBySlug(categorySlug);

      let products;
      if (category) {
        try {
          categoryId = category._id;
          products = await ShopService.getProductsOfCategory(categoryId);
          res.status(200).json(
            {
              products,
              categoryName: category.name,
              categorySlug: category.slug,
            },
          );
        } catch (err) {
          next(err);
        }
      } else {
        res.status(200).json({ products: [], categoryName: categorySlug });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    const prodSlug = (req.params.productSlug) ? req.params.productSlug : '';
    let product = '';
    try {
      product = await ShopService.getProductBySlug(prodSlug);
      const productRes = (product) || {};
      res.status(200).json({ product: productRes, par: prodSlug });
    } catch (err) {
      next(err);
    }
  }
}

export default ShopController;
