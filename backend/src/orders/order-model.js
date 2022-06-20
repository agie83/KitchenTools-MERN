import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'ordered', 'paid', 'finished'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: true,
    default: 'no-image_s7jdwq.jpg',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('order', OrderSchema);
