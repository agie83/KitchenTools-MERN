import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, 'Keresztnév: minimum 3 betű'],
    maxLength: [20, 'Keresztnév: maximum 20 betű'],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [2, 'Vezetéknév: minimum 3 betű'],
    maxLength: [20, 'Vezetéknév: maximum 30 betű'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 254,
  },
  password: {
    type: String,
    required: true,
    maxLength: 100,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  return bcrypt.hash(user.password, 10, (err, salt) => {
    if (err) return next(err);
    user.password = salt;
    return next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('user', UserSchema);
