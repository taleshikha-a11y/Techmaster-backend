import mongoose from "mongoose";

const masterEventSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const workshopSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const conferenceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const bookingRequestSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const eventsPageSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

/* ===========================
   EXPORT MODELS
=========================== */

export const MasterEvent = mongoose.model("MasterEvent", masterEventSchema);
export const Workshop = mongoose.model("Workshop", workshopSchema);
export const Conference = mongoose.model("Conference", conferenceSchema);
export const BookingRequest = mongoose.model("BookingRequest", bookingRequestSchema);
export const EventsPage = mongoose.model("EventsPage", eventsPageSchema);

import fs from "fs";
import path from "path";

const syncEventsToFile = async () => {
  try {
    const events = await MasterEvent.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
    
    const mappedEvents = events.map(e => {
      const obj = e.toObject ? e.toObject() : e;
      return {
        id: obj._id ? obj._id.toString() : "",
        title: obj.title || "",
        type: obj.type || "",
        location: obj.location || "",
        date: obj.date || "",
        attendance: obj.attendance || "",
        description: obj.description || "",
        media: obj.media || "",
        accentColor: obj.accentColor || "#D4AF37",
        status: obj.status || "Active"
      };
    });

    const targetPath = "C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/events.json";
    fs.promises.writeFile(targetPath, JSON.stringify(mappedEvents, null, 2), "utf8");
  } catch (err) {
    console.error("Error syncing Events JSON", err);
  }
};

masterEventSchema.post('save', syncEventsToFile);
masterEventSchema.post('findOneAndUpdate', syncEventsToFile);
masterEventSchema.post('findOneAndDelete', syncEventsToFile);
masterEventSchema.post('findOneAndReplace', syncEventsToFile);

const syncEventsPageToFile = async function(doc) {
  try {
    const EventsPageModel = mongoose.models.EventsPage;
    const page = doc || (EventsPageModel ? await EventsPageModel.findOne() : null);
    if (page) {
      const targetPath = "C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/eventsPage.json";
      const dataStr = JSON.stringify(page.toObject ? page.toObject() : page, null, 2);
      fs.promises.writeFile(targetPath, dataStr, "utf8");
    }
  } catch (err) {
    console.error("Error syncing Events Page JSON", err);
  }
};

eventsPageSchema.post('save', syncEventsPageToFile);
eventsPageSchema.post('findOneAndUpdate', syncEventsPageToFile);
eventsPageSchema.post('findOneAndDelete', syncEventsPageToFile);
eventsPageSchema.post('findOneAndReplace', syncEventsPageToFile);
eventsPageSchema.post('findOneAndUpdate', syncEventsPageToFile);
eventsPageSchema.post('findOneAndDelete', syncEventsPageToFile);
eventsPageSchema.post('findOneAndReplace', syncEventsPageToFile);

