import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 120,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model('Category', CategorySchema);
