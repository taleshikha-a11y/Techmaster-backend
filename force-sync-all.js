import mongoose from "mongoose";
import fs from "fs";
import { Campaign, Launch } from "./src/modules/campaign/campaigns.model.js";
import { MasterEvent, EventsPage } from "./src/modules/events/events.model.js";

// Clean function for campaigns
const cleanMongoData = (doc) => {
  const sanitize = (obj) => {
    if (!obj) return obj;
    if (obj instanceof Date) return obj.toISOString();
    if (obj instanceof Buffer) return obj.toString("base64");
    if (typeof obj === "object" && obj.constructor && obj.constructor.name === "ObjectId") {
      return obj.toString();
    }
    if (Array.isArray(obj)) return obj.map(sanitize);
    if (typeof obj === "object") {
      const result = {};
      for (const [k, v] of Object.entries(obj)) {
        if (k === '_id') {
          result.id = sanitize(v);
        } else if (k !== '__v') {
          result[k] = sanitize(v);
        }
      }
      return result;
    }
    return obj;
  };
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  return JSON.stringify(sanitize(obj), null, 2);
};

const forceSync = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://taleshpatidar:TechMasterDua2026@cluster0.9bhoty5.mongodb.net/ZenVora?retryWrites=true&w=majority");
    console.log("Connected to DB");

    // Sync Campaigns
    const campaign = await Campaign.findOne({});
    if (campaign) {
      fs.writeFileSync("C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/campaigns.json", cleanMongoData(campaign), "utf8");
      console.log("Campaigns synced");
    }

    // Sync Product Launches
    const launch = await Launch.findOne({});
    if (launch) {
      fs.writeFileSync("C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/productLaunches.json", cleanMongoData(launch), "utf8");
      console.log("Launches synced");
    }

    // Sync Events Page
    const eventsPage = await EventsPage.findOne({});
    if (eventsPage) {
      fs.writeFileSync("C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/eventsPage.json", JSON.stringify(eventsPage.toObject ? eventsPage.toObject() : eventsPage, null, 2), "utf8");
      console.log("EventsPage synced");
    }

    console.log("ALL SYNCED SUCCESSFULLY");
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
};

forceSync();
