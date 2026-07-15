import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "./.env") });

import MissionVision from "./src/modules/missionvision/missionvision.model.js";

const migrateDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    // Since schema changed, we can't use Mongoose findOne easily if types conflict heavily,
    // but Mongoose usually casts or ignores. Let's use raw collection to be safe.
    const collection = mongoose.connection.collection("missionvisions");
    const doc = await collection.findOne({});

    if (doc) {
      const updateDoc = {
        $set: {
          mission: Array.isArray(doc.mission) ? doc.mission : (doc.mission ? [doc.mission] : []),
          vision: Array.isArray(doc.vision) ? doc.vision : (doc.vision ? [doc.vision] : []),
          cta: Array.isArray(doc.cta) ? doc.cta : (doc.cta ? [doc.cta] : []),
          seo: Array.isArray(doc.seo) ? doc.seo : (doc.seo ? [doc.seo] : []),
        }
      };
      await collection.updateOne({ _id: doc._id }, updateDoc);
      console.log("Migrated arrays in MongoDB.");

      // Fetch with mongoose to trigger save and syncToFile!
      const mv = await MissionVision.findById(doc._id);
      await mv.save();
      console.log("Triggered syncToFile successfully.");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
};

migrateDB();
