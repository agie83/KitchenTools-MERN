import CategoryModel from './category-model';

export const categoryService = {
  async getCategories() {
    return CategoryModel.find({});
  },
};
