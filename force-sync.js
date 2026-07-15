import mongoose from "mongoose";
import { MasterEvent, EventsPage } from "./src/modules/events/events.model.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

async function triggerSync() {
  try {
    await connectDB();
    console.log("Connected to DB");
    
    let page = await EventsPage.findOne();
    if (page) {
      console.log("Saving EventsPage to trigger hook...");
      page.markModified('heroSettings');
      await page.save();
      console.log("EventsPage synced.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

triggerSync();
