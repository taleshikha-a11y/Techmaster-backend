import mongoose from "mongoose";
import fs from "fs";

/* ==========================================================
   CAMPAIGN CMS — MongoDB Model
========================================================== */

const campaignItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sponsor: { type: String, default: "", trim: true },
    reach: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    highlights: [{ type: String }],
    accentColor: { type: String, default: "#D4AF37" },
    coverImage: { type: String, default: "" },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const lifecycleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const successStorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    linkText: { type: String, default: "", trim: true },
    accentColor: { type: String, default: "#D4AF37" },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const campaignSchema = new mongoose.Schema(
  {
    hero: {
      smallBadge: { type: String, default: "" },
      highlightWord: { type: String, default: "" },
      headline: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    campaignsList: [campaignItemSchema],
    lifecycle: [lifecycleSchema],
    successStories: [successStorySchema],
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      metaKeywords: { type: String, default: "" },
      ogImageUrl: { type: String, default: "" },
    },
  },
  { timestamps: true, strict: false }
);

/* ==========================================================
   PRODUCT LAUNCH CMS — MongoDB Model
========================================================== */

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tagline: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "Laptop" },
    accentColor: { type: String, default: "#D4AF37" },
    status: { type: String, default: "Active Launch" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const initiativeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const launchSchema = new mongoose.Schema(
  {
    hero: {
      smallBadge: { type: String, default: "" },
      highlightWord: { type: String, default: "" },
      headline: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    products: [productSchema],
    featureVideo: {
      smallBadge: { type: String, default: "" },
      headline: { type: String, default: "" },
      description: { type: String, default: "" },
      trailerBtnText: { type: String, default: "" },
      notesBtnText: { type: String, default: "" },
      videoUrl: { type: String, default: "" },
      thumbnailUrl: { type: String, default: "" },
    },
    initiatives: [initiativeSchema],
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      metaKeywords: { type: String, default: "" },
      ogImageUrl: { type: String, default: "" },
    },
  },
  { timestamps: true, strict: false }
);

/* ==========================================================
   SYNC HOOKS
========================================================= */

const cleanMongoData = (doc) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  
  // Recursively convert ObjectIds to strings
  const sanitize = (data) => {
    if (Array.isArray(data)) {
      return data.map(sanitize);
    } else if (data !== null && typeof data === 'object') {
      if (data._bsontype === 'ObjectID' || data.constructor.name === 'ObjectId' || (data.buffer && Object.keys(data).length === 1)) {
        return data.toString();
      }
      const newObj = {};
      for (const key in data) {
        if (key === '_id') {
          newObj[key] = data[key] ? data[key].toString() : data[key];
        } else {
          newObj[key] = sanitize(data[key]);
        }
      }
      return newObj;
    }
    return data;
  };
  
  return JSON.stringify(sanitize(obj), null, 2);
};

const syncCampaign = function(doc) {
  try {
    const targetPath = "C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/campaigns.json";
    const data = doc ? cleanMongoData(doc) : "{}";
    fs.promises.writeFile(targetPath, data, "utf8");
  } catch(e) {
    console.error("Failed to sync campaign data", e);
  }
};

campaignSchema.post('save', syncCampaign);
campaignSchema.post('findOneAndUpdate', async function(doc) {
  if (doc) syncCampaign(doc);
  else syncCampaign(await this.model.findOne(this.getQuery()));
});
campaignSchema.post('findOneAndDelete', syncCampaign);
campaignSchema.post('findOneAndReplace', syncCampaign);

const syncLaunch = function(doc) {
  try {
    const targetPath = "C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/productLaunches.json";
    const data = doc ? cleanMongoData(doc) : "{}";
    fs.promises.writeFile(targetPath, data, "utf8");
  } catch(e) {
    console.error("Failed to sync launch data", e);
  }
};

launchSchema.post('save', syncLaunch);
launchSchema.post('findOneAndUpdate', async function(doc) {
  if (doc) syncLaunch(doc);
  else syncLaunch(await this.model.findOne(this.getQuery()));
});
launchSchema.post('findOneAndDelete', syncLaunch);
launchSchema.post('findOneAndReplace', syncLaunch);

export const Campaign = mongoose.model("Campaign", campaignSchema);
export const Launch = mongoose.model("Launch", launchSchema);
