import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './user-model';

const mockUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@gmail.com',
  password: 'Password1234@',
};

const mockUser2 = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'doe@gmail.com',
  password: 'Password1235@',
};

describe('User model:', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    const user = new User(mockUser);
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('Should be hashed when you add new user', async () => {
    const user = new User(mockUser2);
    const savedUser = await user.save();
    //  regex match bcrypt hash
    expect(savedUser.password).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it('Should throw an error when bcrypt.hash is returning an error', async () => {
    jest.spyOn(bcrypt, 'hash')
      .mockImplementationOnce((pass, salt, cb) => cb(new Error('bcrypt error')));
    const user = new User(mockUser2);
    expect.assertions(1);
    try {
      await user.save();
    } catch (e) {
      expect(e.message).toBe('bcrypt error');
    }
  });

  it('Do not hash when password doesn\'t change', async () => {
    const user = await User.findOne({ email: mockUser.email });
    const originalPasswordHash = user.password;
    user.firtName = 'new first name';
    const editedUser = await user.save();
    expect(editedUser.password).toMatch(originalPasswordHash);
  });

  describe('user.comparePassword()', () => {
    it('Should return false, when password is incorrect', async () => {
      const user = await User.findOne({ email: mockUser.email });
      const isMatch = await user.comparePassword('wrong');
      expect(isMatch).toBeFalsy();
    });

    it('Should return true, when password is correct', async () => {
      const user = await User.findOne({ email: mockUser.email });
      const isMatch = await user.comparePassword(mockUser.password);
      expect(isMatch).toBeTruthy();
    });
  });
});
