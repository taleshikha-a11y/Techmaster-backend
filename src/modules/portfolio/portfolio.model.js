import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const portfolioSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },


    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },


    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },


    description: {
      type: String,
      trim: true,
    },


    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },


    clientName: {
      type: String,
      trim: true,
    },


    projectDate: {
      type: Date,
    },


    technologies: [
      {
        type: String,
      },
    ],


    images: [
      {
        type: String,
      },
    ],


    thumbnail: {
      type: String,
      default: "",
    },


    video: {
      type: String,
      default: "",
    },


    featured: {
      type: Boolean,
      default: false,
    },


    status: {
      type: String,
      default: "Active",
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

  },
  {
    timestamps: true,
    strict: false,
  }
);



// ==========================
// Auto Generate Slug
// ==========================

portfolioSchema.pre("save", function () {

  if (this.isModified("title")) {

    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Math.random().toString(36).substring(2, 6);

  }

});



const Portfolio = mongoose.model(
  "Portfolio",
  portfolioSchema
);



// ==========================
// File Sync Hook
// ==========================
const syncToFile = async () => {
  try {
    const Portfolio = mongoose.models.Portfolio;
    const PortfolioSetting = mongoose.models.PortfolioSetting;
    
    if (!Portfolio || !PortfolioSetting) return;

    const items = await Portfolio.find({}).sort({ createdAt: -1 }).lean();
    const settings = await PortfolioSetting.findOne({}).lean();

    const dataDir = path.resolve(__dirname, '../../../../../Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data');
    
    if (fs.existsSync(dataDir)) {
      // Sync items
      const mappedItems = items.map(item => ({
        id: item._id ? item._id.toString() : '',
        title: item.title || '',
        subtitle: item.shortDescription || '',
        category: item.category || 'All',
        client: item.clientName || '',
        year: item.projectDate ? new Date(item.projectDate).getFullYear().toString() : '2026',
        description: item.shortDescription || '',
        tags: item.technologies || [],
        coverImage: item.thumbnail || '',
        videoUrl: item.video || '',
        gallery: item.images || [],
        accentColor: item.accentColor || '#D4AF37'
      }));
fs.promises.writeFile(path.join(dataDir, "portfolio.json"), JSON.stringify(mappedItems, null, 2), "utf8");

      // Sync settings
      if (settings) {
        const mappedSettings = {
          hero: {
            smallBadge: settings.smallHeading || '',
            headline: (settings.mainHeadingLine1 || '') + ' ' + (settings.mainHeadingLine2 || ''),
            highlightWord: settings.highlightText || '',
            description: settings.description || '',
            backgroundGlow: settings.isVisible !== false
          }
        };
fs.promises.writeFile(path.join(dataDir, "portfolioSettings.json"), JSON.stringify(mappedSettings, null, 2), "utf8");
      }
      console.log('Successfully synced Portfolio JSON files');
    }
  } catch (err) {
    console.error('Error syncing Portfolio JSON files', err);
  }
};

portfolioSchema.post('save', syncToFile);
portfolioSchema.post('findOneAndUpdate', syncToFile);
portfolioSchema.post('findOneAndDelete', syncToFile);
portfolioSchema.post('findOneAndReplace', syncToFile);

const portfolioSettingSchema = new mongoose.Schema({
  isVisible: { type: Boolean, default: true },
  smallHeading: String,
  highlightText: String,
  mainHeadingLine1: String,
  mainHeadingLine2: String,
  description: String,
  bgImageUrl: String,
  bgVideoUrl: String
}, { timestamps: true, strict: false });

portfolioSettingSchema.post('save', syncToFile);
portfolioSettingSchema.post('findOneAndUpdate', syncToFile);

export const PortfolioSetting = mongoose.model('PortfolioSetting', portfolioSettingSchema);

export default Portfolio;