import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Map Mongoose Model Names to Visitor JSON File Names
const modelToFileMap = {
  'Event': 'events.json',
  'FAQ': 'faq.json',
  'Contact': 'contact.json',
  'Homepage': 'home.json'
};

const VISITOR_DATA_PATH = path.resolve('C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data');

export const syncModelToJson = async (modelName) => {
  try {
    const fileName = modelToFileMap[modelName];
    if (!fileName) return;

    const Model = mongoose.models[modelName];
    if (!Model) return;

    let data = await Model.find({}).lean();

    let dataToWrite = data;
    
    // Explicitly handle singleton models vs collection models
    const singletonModels = ['Service', 'FounderJourney', 'About'];
    
    if (singletonModels.includes(modelName)) {
      if (data.length > 0) {
        const doc = data[0];
        if (modelName === 'Service') {
           dataToWrite = doc.mainServices || doc.cards || doc.categories || Object.values(doc).find(val => Array.isArray(val)) || doc;
        } else {
           dataToWrite = doc;
        }
      } else {
        dataToWrite = {};
      }
    }

    // SANITIZATION: Convert known array-fields from comma-strings to actual arrays (since Admin Panel saves them as strings)
    const arrayFields = ['features', 'tags', 'skills', 'benefits', 'techStack'];
    const sanitizeData = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(sanitizeData);
      } else if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
          if (arrayFields.includes(key) && typeof value === 'string') {
            // Split comma-separated string, trim, and remove empty
            newObj[key] = value.split(',').map(s => s.trim()).filter(Boolean);
          } else {
            newObj[key] = sanitizeData(value);
          }
        }
        return newObj;
      }
      return obj;
    };

    dataToWrite = sanitizeData(dataToWrite);

    const filePath = path.join(VISITOR_DATA_PATH, fileName);
    await fs.promises.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
    console.log(`[SYNC ENGINE] Successfully synced ${modelName} to ${fileName}`);
  } catch (error) {
    console.error(`[SYNC ENGINE] Error syncing ${modelName}:`, error.message);
  }
};
