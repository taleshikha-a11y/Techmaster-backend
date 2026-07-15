import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const founderJourneyItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    year: {
      type: String,
      required: [true, "Year / time period is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title name is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

// Indexing for faster sorting and fetching
founderJourneyItemSchema.index({ type: 1, order: 1 });

function syncJourneyJson() {
  try {
    const targetPath = path.resolve(
      __dirname,
      "../../../../../Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/journey.json"
    );
    // We need to fetch all active timeline items to build the JSON
    mongoose.model('FounderJourneyItem').find({ type: 'Timeline', status: 'Active' })
      .sort({ order: 1 })
      .then(items => {
        const journeyData = items.map(item => ({
          year: item.year || "",
          title: item.title || "",
          subtitle: "",
          description: item.description || ""
        }));
        if (fs.existsSync(path.dirname(targetPath))) {
fs.promises.writeFile(targetPath, JSON.stringify(journeyData, null, 2), "utf8");
          console.log("Successfully synced founder journey to journey.json");
        }
      })
      .catch(err => console.error("Error fetching journey items for sync:", err));
  } catch (error) {
    console.error("Error in syncJourneyJson:", error);
  }
}

founderJourneyItemSchema.post("save", syncJourneyJson);
founderJourneyItemSchema.post("findOneAndDelete", syncJourneyJson);
founderJourneyItemSchema.post("findOneAndRemove", syncJourneyJson);
founderJourneyItemSchema.post("deleteOne", syncJourneyJson);
founderJourneyItemSchema.post("deleteMany", syncJourneyJson);

const founderJourneySettingSchema = new mongoose.Schema(
  {
    sections: {
      timeline: {
        status: { type: String, default: "Active" },
      },
      milestones: {
        status: { type: String, default: "Active" },
      },
      futureVision: {
        status: { type: String, default: "Active" },
      },
    },
    futureVision: {
      futureHeading: {
        type: String,
        required: [true, "Future Vision heading is required"],
        default: "The Horizon of Immersive Media",
      },
      futureDescription: {
        type: String,
        default: "Driving dynamic visual architectures across global operations networks.",
      },
      image: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
    },
    hero: { type: mongoose.Schema.Types.Mixed, default: {} },
    timelineSettings: { type: mongoose.Schema.Types.Mixed, default: {} },
    seo: { type: mongoose.Schema.Types.Mixed, default: {} },
    isDraft: {
      type: Boolean,
      default: true,
    },
  },
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

founderJourneySettingSchema.post("save", function(doc) {
  try {
    const targetPath = path.resolve(
      __dirname,
      "../../../../../Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/journeySettings.json"
    );
    
    const settingsData = {
      hero: doc.hero || {},
      timelineSettings: doc.timelineSettings || {},
      futureVision: doc.futureVision || {},
      seo: doc.seo || {},
      highlights: doc.highlights || []
    };

    if (fs.existsSync(path.dirname(targetPath))) {
fs.promises.writeFile(targetPath, JSON.stringify(journeySettings, null, 2), "utf8");
      console.log("Successfully synced founder journey settings to journeySettings.json");
    }
  } catch (error) {
    console.error("Error generating journeySettings.json:", error);
  }
});

const FounderJourneyItem = mongoose.model(
  "FounderJourneyItem",
  founderJourneyItemSchema
);
const FounderJourneySetting = mongoose.model(
  "FounderJourneySetting",
  founderJourneySettingSchema
);

export { FounderJourneyItem, FounderJourneySetting };
export default {
  FounderJourneyItem,
  FounderJourneySetting,
};
