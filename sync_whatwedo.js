
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WhatWeDo from './src/modules/whatWeDo/whatWeDo.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  let doc = await WhatWeDo.findOne();
  if (doc) {
    await doc.save();
    console.log('Saved');
  } else {
    console.log('No doc found');
  }
  process.exit(0);
}
run();

