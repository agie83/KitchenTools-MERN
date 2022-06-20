import userService from './user-service';
import userController from './user-controller';

jest.mock('./user-service');

const req = { user: { id: '6257326ca4457e2db2e75614' } };

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockNext = jest.fn();

describe('User controller\'s get method', () => {
  test('should call next with error thrown by service', async () => {
    const err = new Error('something went wrong');
    userService.getUserDataById.mockRejectedValueOnce(err);
    await userController.get(req, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(err);
  });

  test('should return user data saved in the database', async () => {
    const data = 'fakeData';
    userService.getUserDataById.mockResolvedValueOnce(data);
    await userController.get(req, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(data);
    expect(mockRes.json).toBeCalledTimes(1);
  });
});

describe('User controller\'s patch method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call next with error thrown by service', async () => {
    const err = new Error('something went wrong again');
    userService.patchUserData.mockRejectedValueOnce(err);
    await userController.patch(req, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(err);
  });

  test('should return the updated user data saved in the database', async () => {
    const data = 'fakeDataFromDb';
    userService.patchUserData.mockResolvedValueOnce(data);
    await userController.patch(req, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(data);
    expect(mockRes.json).toBeCalledTimes(1);
  });
});
