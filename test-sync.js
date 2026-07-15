import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/database.js';
import Service from './src/modules/service/service.model.js';
import { syncModelToJson } from './src/utils/syncToJson.js';

const test = async () => {
  await connectDB();
  console.log('Registered Models:', Object.keys(import('mongoose').then(m => m.default.models)));
  await syncModelToJson('Service');
  process.exit(0);
};

test();
