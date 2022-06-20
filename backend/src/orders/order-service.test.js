import OrderService from './order-service';
import OrderModel from './order-model';
import HttpError from '../_utils/HttpError';

const mockGetOrders = jest.fn();
OrderModel.getOrders = mockGetOrders;

describe('OrderService getOrders ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should call OrderModel.find', async () => {
    await OrderModel.getOrders('62abab5904c1a81be318e95c');
    expect(mockGetOrders).toBeCalled();
  });
});

describe('OrderService setStatusToOrdered', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should throw an error if userId is not valid', async () => {
    expect.assertions(3);
    const userId = { userId: 'fakeId' };
    try {
      await OrderService.setStatusToOrdered(userId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Invalid user id!');
    }
  });
});
