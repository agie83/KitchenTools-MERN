import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 120,
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  qty: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
  },
  labels: {
    type: [String],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Product', ProductSchema);
