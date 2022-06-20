import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import LoginService from './login-service';
import HttpError from '../_utils/HttpError';

const mockComparePassword = jest.fn();

const mockUser = {
  _id: ObjectId(),
  email: 'example@example.com',
  firstName: 'Elek',
  password: '$2a$10$vD3bIpA2MBzoyLG02.Jdk.RgWoMzvkVmK2KXTWE9pgEGPUlvFIzpC',
  roles: ['user'],
  comparePassword: mockComparePassword,
};

const mockGetUserByEmail = jest.fn();
LoginService.getUserByEmail = mockGetUserByEmail;

describe('LoginService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should return a jwt token wich includes all required keys (id, firstName, roles)', async () => {
    const req = { email: 'sample@sample.com', password: 'samplePassword' };
    mockGetUserByEmail.mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValueOnce(true);
    const mockSign = jest.fn();
    jwt.sign = mockSign;
    await LoginService.getJwtToken(req);
    expect(mockSign.mock.calls[0][0]).toEqual({
      id: mockUser._id.toString(),
      firstName: mockUser.firstName,
      roles: mockUser.roles,
    });
  });

  test('should throw an error if body is empty', async () => {
    expect.assertions(3);
    const req = {};
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Minden mező kitöltése kötelező!');
    }
  });

  test('should throw an error if email and password fields are empty', async () => {
    expect.assertions(3);
    const req = { email: '', password: '' };
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Email cím megadása kötelező!,Jelszó megadása kötelező!');
    }
  });

  test('should throw an error if email is not provided', async () => {
    expect.assertions(3);
    const req = { password: 'samplePassword' };
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Email cím megadása kötelező!');
    }
  });

  test('should throw an error if email is empty', async () => {
    expect.assertions(3);
    const req = { email: '', password: 'samplePassword' };
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Email cím megadása kötelező!');
    }
  });

  test('should throw an error if password is not provided', async () => {
    expect.assertions(3);
    const req = { email: 'sample@sample.com' };
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Jelszó megadása kötelező!');
    }
  });

  test('should throw an error if password is empty', async () => {
    expect.assertions(3);
    const req = { email: 'sample@sample.com', password: '' };
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Jelszó megadása kötelező!');
    }
  });

  test('should throw an error if email format is not valid', async () => {
    expect.assertions(1);
    const req = { email: 'wrongEmailFormat', password: 'samplePassword' };
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error.message).toBe('Nem megfelelő email cím formátum');
    }
  });

  test('should throw an error if getUserByEmail runs to error', async () => {
    expect.assertions(1);
    const req = { email: 'sample@sample.com', password: 'samplePassword' };
    mockGetUserByEmail.mockRejectedValueOnce(new Error('Some error.'));
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error.message).toBe('Szerverhiba');
    }
  });

  test('should throw an error if comparePassword runs to error', async () => {
    expect.assertions(1);
    const req = { email: 'sample@sample.com', password: 'samplePassword' };
    mockGetUserByEmail.mockResolvedValue(mockUser);
    mockComparePassword.mockRejectedValueOnce(new Error('Some error.'));
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error.message).toBe('Szerverhiba');
    }
  });

  test('should throw an error if email is not in database', async () => {
    expect.assertions(3);
    const req = { email: 'wrongEmail@sample.com', password: 'samplePassword' };
    mockGetUserByEmail.mockResolvedValue(null);
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Nem megfelelő email cím vagy jelszó');
    }
  });

  test('should throw an error if password is not correct', async () => {
    expect.assertions(3);
    const req = { email: 'sample@sample.com', password: 'wrongSamplePassword' };
    mockGetUserByEmail.mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValueOnce(false);
    try {
      await LoginService.getJwtToken(req);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Nem megfelelő email cím vagy jelszó');
    }
  });
});
