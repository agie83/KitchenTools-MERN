import { ObjectId } from 'mongodb';
import CartService from './cart-service';
import UserModel from '../user/user-model';
import ProductModel from '../products/product-model';
import OrderModel from '../orders/order-model';
import HttpError from '../_utils/HttpError';

const mockUserById = jest.fn();
UserModel.findById = mockUserById;

const mockProductById = jest.fn();
ProductModel.findById = mockProductById;

const mockCreateOrder = jest.fn();
OrderModel.create = mockCreateOrder;

const mockUser = {
  _id: ObjectId(),
  firstName: 'John',
  lastName: 'Doe',
  email: 'example@example.com',
  password: '$2b$10$bvS4t9kFkmnhXhTKNKj9bOyIBSVDcXHx81EwwFDkX7cxcO2aFvITq',
};
const mockProduct = {
  _id: ObjectId(),
  name: 'Teflonos serpenyő',
  slug: 'teflonos-serpenyo',
  description: 'Teflon serpenyő levehető fogantyúval, 30 cm',
  images: ['example.jpg'],
  price: 6450,
  categoryId: new ObjectId('6284eb7898403fd69bd73f03'),
  labels: ['teflon'],
  qty: 5,
};
const mockDbOrder = {
  // _id: new ObjectId('62abab5904c1a81be318e95c'),
  status: 'pending',
  name: 'Teflonos serpenyő',
  price: 6450,
  qty: 2,
  image: 'example.jpg',
  userId: new ObjectId('62a1cb20b937dce9bd0afb65'),
  productId: new ObjectId('628c88a2507560dba6c066cd'),
  orderDate: '2022-05-24T12:48:05.372Z',
};
describe('CartService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should return an object if product was successfully added to cart', async () => {
    expect.assertions(1);
    const userId = { userId: '62a1cb20b937dce9bd0afb65' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    mockUserById.mockResolvedValueOnce(mockUser);
    mockProductById.mockResolvedValueOnce(mockProduct);
    mockCreateOrder.mockResolvedValueOnce(mockDbOrder);
    const result = await CartService.addToCart(userId, productId);
    const expectedOutput = {
      status: mockDbOrder.status,
      name: mockDbOrder.name,
      price: mockDbOrder.price,
      image: mockDbOrder.image,
      userId: mockDbOrder.userId,
      productId: mockDbOrder.productId,
      qty: mockDbOrder.qty,
      orderDate: mockDbOrder.orderDate,
    };
    expect(result).toEqual(expectedOutput);
  });
  test('should throw an error if productId is empty', async () => {
    expect.assertions(3);
    const userId = { userId: '62a1cb20b937dce9bd0afb65' };
    try {
      await CartService.addToCart(userId, {});
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Product ID is required.');
    }
  });

  test('should throw an error if userId is not valid', async () => {
    expect.assertions(3);
    const userId = { userId: 'fakeId' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('User ID is not valid.');
    }
  });
  test('should throw an error if productId is not valid', async () => {
    expect.assertions(3);
    const userId = { userId: '62a1cb20b937dce9bd0afb65' };
    const productId = { productId: 'fakeId' };
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Product ID is not valid.');
    }
  });

  test('should throw an error in case of database error (find user by id)', async () => {
    expect.assertions(3);
    const userId = { userId: '628c8822ed3345aa748c2148' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    mockUserById.mockRejectedValueOnce();
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Database error.');
    }
  });

  test('should throw an error if user doesn\'t exist', async () => {
    expect.assertions(3);
    const userId = { userId: '628c8822ed3345aa748c2149' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    mockUserById.mockResolvedValueOnce(null);
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('User doesn\'t exist.');
    }
  });

  test('should throw an error in case of database error (find product by id)', async () => {
    expect.assertions(3);
    const userId = { userId: '628c8822ed3345aa748c2149' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    mockUserById.mockResolvedValueOnce(mockUser);
    mockProductById.mockRejectedValueOnce();
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Database error.');
    }
  });

  test('should throw an error if product doesn\'t exist', async () => {
    expect.assertions(3);
    const userId = { userId: '628c8822ed3345aa748c2149' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    mockUserById.mockResolvedValueOnce(mockUser);
    mockProductById.mockResolvedValueOnce(null);
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Product doesn\'t exist.');
    }
  });

  test('should throw an error in case of database error (create order)', async () => {
    expect.assertions(3);
    const userId = { userId: '628c8822ed3345aa748c2149' };
    const productId = { productId: '628c88a2507560dba6c066cd' };
    mockUserById.mockResolvedValueOnce(mockUser);
    mockProductById.mockResolvedValueOnce(mockProduct);
    mockCreateOrder.mockRejectedValueOnce();
    try {
      await CartService.addToCart(userId, productId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Database error.');
    }
  });
});
