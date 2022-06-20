import CategoryModel from '../categories/category-model';
import ProductModel from '../products/product-model';

class ShopService {
  static async getAllCategories() {
    return CategoryModel.find({});
  }

  static async getCategoryBySlug(slug) {
    return CategoryModel.findOne({ slug }).exec();
  }

  static async getProductsOfCategory(id) {
    return ProductModel.find({ category: id });
  }

  static async getProductBySlug(productSlug) {
    return ProductModel.findOne({ slug: productSlug });
  }
}

export default ShopService;
