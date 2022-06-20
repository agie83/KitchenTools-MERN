import mongoose from 'mongoose';
import config from '../config';
import logger from '../logger';
import StoreModel from '../stores/store-model';
import CategoryModel from '../categories/category-model';
import ProductModel from '../products/product-model';
import stores from './stores';
import products from './products';
import categories from './categories';

const { db } = config;

async function connectToDb() {
  try {
    await mongoose.connect(db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error(err.message);
  }
}
async function loadData() {
  await connectToDb();
  await StoreModel.insertMany(stores);
  await CategoryModel.insertMany(categories);
  // await ProductModel.insertMany(products);
  logger.info('collections initialized');
  process.exit(0);
}

loadData();
