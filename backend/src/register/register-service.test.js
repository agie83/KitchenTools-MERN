import mongoose from 'mongoose';
import User from '../user/user-model';
import RegisterService from './register-service';
import HttpError from '../_utils/HttpError';

jest.mock('../user/user-model');

const mockUserData = {
  email: 'johndoe@test.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'Password123@',
  passwordAgain: 'Password123@',
};
const mockDbUser = {
  _doc: {
    ...mockUserData,
    _id: 'abc123',
    timestamp: Date.now(),
  },
};
const error = new mongoose.Error();

describe('register service', () => {
  it('should return user object without password', async () => {
    User.prototype.save.mockResolvedValueOnce(mockDbUser);
    User.findOne.mockResolvedValueOnce(null);
    const user = await RegisterService.addUser(mockUserData);
    expect(user).toEqual(
      expect.not.objectContaining({
        password: mockUserData.password,
      }),
    );
  });
});
describe('throw error', () => {
  beforeEach(() => {
    User.findOne.mockResolvedValueOnce(null);
    User.prototype.save.mockRejectedValueOnce(error);
  });

  it('when the email is already taken', async () => {
    User.findOne.mockReset();
    User.findOne.mockResolvedValueOnce(mockDbUser);
    expect.assertions(3);
    try {
      await RegisterService.addUser(mockUserData);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.message).toBe('A megadott email cím már szerepel a rendszerünkben.');
      expect(err.status).toBe(400);
    }
  });

  it('when a field is missing', async () => {
    error.errors = {
      firstName: {
        path: 'firstName',
        kind: 'required',
      },
    };
    expect.assertions(3);
    try {
      await RegisterService.addUser(mockUserData);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.message).toBe('Keresztnév megadása kötelező!');
      expect(err.status).toBe(400);
    }
  });

  it('when two or more field is missing.', async () => {
    error.errors = {
      password: {
        path: 'password',
        kind: 'required',
      },
      firstName: {
        path: 'name',
        kind: 'required',
      },
    };
    expect.assertions(3);
    try {
      await RegisterService.addUser(mockUserData);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.message).toBe('Keresztnév és Jelszó megadása kötelező!');
      expect(err.status).toBe(400);
    }
  });

  it('when mongoose validator is throw error', async () => {
    error.errors = {
      password: {
        path: 'password',
        kind: 'somethings',
        message: 'something went wrong',
      },
    };
    expect.assertions(3);
    try {
      await RegisterService.addUser(mockUserData);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
      expect(err.message).toBe('something went wrong');
      expect(err.status).toBe(400);
    }
  });

  it('when the error doesn\'t the type of mongoose', async () => {
    User.prototype.save.mockReset();
    User.prototype.save.mockRejectedValueOnce(new Error('Something went wrong'));
    expect.assertions(2);
    try {
      await RegisterService.addUser(mockUserData);
    } catch (err) {
      expect(err).not.toBeInstanceOf(HttpError);
      expect(err.message).toBe('Something went wrong');
    }
  });
});
