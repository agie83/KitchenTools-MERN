import StoreModel from './store-model';

const mockGetStores = jest.fn();
StoreModel.getStores = mockGetStores;

describe('StoreService getStores ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call StoreModel.find', async () => {
    await StoreModel.getStores();
    expect(mockGetStores).toBeCalled();
  });
});
