import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const heroSchema = new mongoose.Schema(
  {
    smallBadge: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    highlightWord: {
      type: String,
      default: "",
    },
    glowEnabled: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false, strict: false }
);


const operationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    subtitle: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    accent: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    order: {
      type: Number,
      default: 1,
    },

    // Soft delete support
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: false
  }
);



const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    order: {
      type: Number,
      default: 1,
    },

    // Soft delete support
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: false
  }
);



const quoteBannerSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      default: "",
    },

    quoteText: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
    strict: false
  }
);



const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    metaKeywords: {
      type: String,
      default: "",
    },

    ogImageUrl: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
    strict: false
  }
);



const sectionSettingSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    _id: false,
    strict: false
  }
);



const whatWeDoSchema = new mongoose.Schema(
  {

    hero: {
      type: heroSchema,
      default: () => ({}),
    },


    operations: {
      type: [operationSchema],
      default: [],
    },


    servicesList: {
      type: [serviceSchema],
      default: [],
    },


    quoteBanner: {
      type: quoteBannerSchema,
      default: () => ({}),
    },


    seo: {
      type: seoSchema,
      default: () => ({}),
    },


    sectionSettings: {

      hero: {
        type: sectionSettingSchema,
        default: () => ({
          order: 1,
          status: "Active",
        }),
      },


      operations: {
        type: sectionSettingSchema,
        default: () => ({
          order: 2,
          status: "Active",
        }),
      },


      servicesList: {
        type: sectionSettingSchema,
        default: () => ({
          order: 3,
          status: "Active",
        }),
      },


      quoteBanner: {
        type: sectionSettingSchema,
        default: () => ({
          order: 4,
          status: "Active",
        }),
      },


      seo: {
        type: sectionSettingSchema,
        default: () => ({
          order: 5,
          status: "Active",
        }),
      },

    },


    // Publish System
    isPublished: {
      type: Boolean,
      default: false,
    },


    publishedAt: {
      type: Date,
      default: null,
    },


    // Draft System
    draftStatus: {
      type: String,
      enum: [
        "Draft",
        "Published",
      ],
      default: "Draft",
    },


  },
  {
    timestamps: true,
    strict: false
  }
);



// Sync hook to write JSON file for the visitor page
const syncToFile = async function (doc) {
  if (!doc) return;
  try {
    const targetPath = path.resolve(
      __dirname,
      "../../../../../Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/whatWeDo.json"
    );
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
fs.promises.writeFile(targetPath, JSON.stringify(whatWeDoVisitorData, null, 2), "utf8");
    console.log("whatWeDo.json successfully synced to visitor site.");
  } catch (error) {
    console.error("Error syncing whatWeDo.json:", error);
  }
};

whatWeDoSchema.post("save", syncToFile);
whatWeDoSchema.post("findOneAndUpdate", syncToFile);

const WhatWeDo = mongoose.model(
  "WhatWeDo",
  whatWeDoSchema
);

export default WhatWeDo;