import ProductModel from '../products/product-model';
import CategoryModel from '../categories/category-model';

const mockProductById = jest.fn();
ProductModel.findById = mockProductById;

const mockGetAllCategories = jest.fn();
CategoryModel.getAllCategories = mockGetAllCategories;

const mockGetCategoryBySlug = jest.fn();
CategoryModel.getCategoryBySlug = mockGetCategoryBySlug;

const mockGetProductsOfCategory = jest.fn();
ProductModel.getProductsOfCategory = mockGetProductsOfCategory;

const mockGetProductBySlug = jest.fn();
ProductModel.getProductBySlug = mockGetProductBySlug;

describe('ShopService getAllCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call CategoryModel.find', async () => {
    await CategoryModel.getAllCategories();
    expect(mockGetAllCategories).toBeCalled();
  });
});

describe('ShopService getCategoryBySlug', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call CategoryModel.findOne', async () => {
    await CategoryModel.getCategoryBySlug('slug');
    expect(mockGetCategoryBySlug).toBeCalled();
  });
});

describe('ShopService getProductsOfCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call ProductModel.find', async () => {
    await ProductModel.getProductsOfCategory({ category: '' });
    expect(mockGetProductsOfCategory).toBeCalled();
  });
});

describe('ShopService getProductBySlug', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call ProductModel.findOne', async () => {
    await ProductModel.getProductBySlug({ slug: '' });
    expect(mockGetProductBySlug).toBeCalled();
  });
});
