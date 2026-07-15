import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    team: {
      type: String,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Remote",
        "Freelance",
      ],
      default: "Full Time",
    },

    experience: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    salary: {
      type: String,
      trim: true,
    },

    vacancies: {
      type: Number,
      default: 1,
      min: 1,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    companyLogo: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// File Sync Hook
// ==========================
const syncToFile = async () => {
  try {
    const Job = mongoose.models.Job;
    const JobSetting = mongoose.models.JobSetting;
    
    if (!Job || !JobSetting) return;

    const items = await Job.find({}).sort({ createdAt: -1 }).lean();
    const settings = await JobSetting.findOne({}).lean();

    const dataDir = path.resolve(__dirname, '../../../../../Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data');
    
    if (fs.existsSync(dataDir)) {
      // Sync items
      const mappedItems = items.map(item => ({
        id: item._id,
        team: item.team || item.department || 'General',
        role: item.title || '',
        description: item.description || '',
        location: item.location || '',
        type: item.employmentType || item.type || 'Full Time',
        salary: item.salary || '',
        featured: item.featured || false,
        applyUrl: item.applyLink || '#'
      }));
fs.promises.writeFile(path.join(dataDir, "career.json"), JSON.stringify(mappedItems, null, 2), "utf8");

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
fs.promises.writeFile(path.join(dataDir, "careerSettings.json"), JSON.stringify(mappedSettings, null, 2), "utf8");
      }
      console.log('Successfully synced Career JSON files');
    }
  } catch (err) {
    console.error('Error syncing Career JSON files', err);
  }
};

jobSchema.post('save', syncToFile);
jobSchema.post('findOneAndUpdate', syncToFile);
jobSchema.post('findOneAndDelete', syncToFile);
jobSchema.post('findOneAndReplace', syncToFile);

const jobSettingSchema = new mongoose.Schema({
  isVisible: { type: Boolean, default: true },
  smallHeading: String,
  highlightText: String,
  mainHeadingLine1: String,
  mainHeadingLine2: String,
  description: String,
  bgImageUrl: String,
  bgVideoUrl: String
}, { timestamps: true, strict: false });

jobSettingSchema.post('save', syncToFile);
jobSettingSchema.post('findOneAndUpdate', syncToFile);

export const JobSetting = mongoose.model('JobSetting', jobSettingSchema);

const Job = mongoose.model("Job", jobSchema);
export default Job;