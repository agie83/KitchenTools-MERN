import { categoryService } from './category-service';

export const categoryController = {
  async get(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  },
};
