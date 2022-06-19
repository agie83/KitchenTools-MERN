import UserSchema from './user-model';
import HttpError from '../_utils/HttpError';
import userService from './user-service';

jest.mock('./user-model');
const mockSave = jest.fn();
const mockSelect = jest.fn();

const mockSavedUserData = {
  _id: '6257326ca4457e2db2e75614',
  firstName: 'John',
  lastName: 'Doe',
  email: 'jhon.doe@gmail.com',
  save: mockSave,
  select: mockSelect,
};

const mockRequestBody = {
  firstName: 'John',
  lastName: 'Doe',
};

describe('User service\'s getUserDataById method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return user data saved in database', async () => {
    const req = { user: { id: '6257326ca4457e2db2e75614' } };
    UserSchema.findById.mockResolvedValue(mockSavedUserData);
    const data = await userService.getUserDataById(req.user.id);
    expect(data).toEqual(mockSavedUserData);
  });
});

describe('User service\'s patchUserData method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error if request body is missing', async () => {
    expect.assertions(3);
    const req = { user: { id: '6257326ca4457e2db2e75614' }, body: {} };
    try {
      await userService.patchUserData(req);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.status).toBe(401);
      expect(err.message).toBe('Hiányzó adat');
    }
  });

  test('should return updated user data', async () => {
    const req = { user: { id: '6257326ca4457e2db2e75614' }, body: mockRequestBody };
    UserSchema.findById.mockResolvedValueOnce(mockSavedUserData);
    const data = await userService.patchUserData(req);
    expect(data).toEqual(mockSavedUserData);
  });
});
