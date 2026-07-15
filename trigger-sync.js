import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import { syncModelToJson } from './src/utils/syncToJson.js';

// Import all models to register them
import './src/modules/service/service.model.js';
import './src/modules/events/events.model.js';
import './src/modules/campaign/campaign.model.js';
import './src/modules/career/career.model.js';
import './src/modules/blogs/blog.model.js';
import './src/modules/media coverage/media.model.js';
import './src/modules/FAQ/faq.model.js';
import './src/modules/founderJourney/founderJourney.model.js';
import './src/modules/collabration/collabration.model.js';
import './src/modules/portfolio/portfolio.model.js';

const modelsToSync = [
  'Service', 'Event', 'Campaign', 'Career', 'Blog', 'Media', 'FAQ', 'FounderJourney', 'Collabration', 'Portfolio'
];

const runSync = async () => {
  await connectDB();
  console.log('Triggering global sync...');
  for (const model of modelsToSync) {
    await syncModelToJson(model);
  }
  console.log('Sync complete!');
  process.exit(0);
};

runSync();
