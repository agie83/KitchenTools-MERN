import mongoose from 'mongoose';

const { Schema } = mongoose;

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 120,
  },
  address: {
    type: String,
    required: true,
  },
  opening: {
    type: String,
  },
  mapLink: {
    type: String,
  },
  mapImage: {
    type: String,
  },
});

export default mongoose.model('Store', StoreSchema);
