
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Collaboration from './src/modules/collabration/collaboration.model.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  let doc = await Collaboration.findOne();
  if (!doc) {
    doc = new Collaboration({});
    await doc.save();
  } else {
    // Trigger the save hook
    await doc.save();
  }
  console.log('Saved collaboration');
  process.exit(0);
}
run();

