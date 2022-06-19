import CategoryModel from './category-model';

const mockGetCategories = jest.fn();
CategoryModel.getCategories = mockGetCategories;

describe('CategoryService getCategories ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call CategoryModel.find', async () => {
    await CategoryModel.getCategories();
    expect(mockGetCategories).toBeCalled();
  });
});
