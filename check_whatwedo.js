
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WhatWeDo from './src/modules/whatWeDo/whatWeDo.model.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  let doc = await WhatWeDo.findOne();
  console.log('Doc:', JSON.stringify(doc, null, 2));
  process.exit(0);
}
run();

