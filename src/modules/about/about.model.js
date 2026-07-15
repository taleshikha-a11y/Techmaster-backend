import mongoose from "mongoose";
import fs from "fs";

const { Schema, model } = mongoose;

/* ==========================================================
   COMMON MEDIA SCHEMA
========================================================== */

const mediaSchema = new Schema(
  {
    url: {
      type: String,
      default: "",
      trim: true,
    },

    publicId: {
      type: String,
      default: "",
      trim: true,
    },

    alt: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    size: {
      type: Number,
      default: 0,
    },

    mimeType: {
      type: String,
      default: "",
    },
  },
  { strict: false }
);

/* ==========================================================
   INTRODUCTION
========================================================== */

const introductionSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    subtitle: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    buttonText: {
      type: String,
      trim: true,
      default: "",
    },

    buttonLink: {
      type: String,
      trim: true,
      default: "",
    },

    profileImage: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   STORY
========================================================== */

const storySchema = new Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },

    storyContent: {
      type: String,
      default: "",
    },

    gallery: {
      type: [mediaSchema],
      default: [],
    },

    featuredVideo: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   VISION
========================================================== */

const visionSchema = new Schema(
  {
    visionTitle: {
      type: String,
      trim: true,
      default: "",
    },

    visionDescription: {
      type: String,
      default: "",
    },

    image: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);
/* ==========================================================
   HIGHLIGHTS
========================================================== */

const highlightSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

/* ==========================================================
   ACHIEVEMENTS
========================================================== */

const achievementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    image: {
      type: mediaSchema,
      default: () => ({}),
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

/* ==========================================================
   AWARDS
========================================================== */

const awardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    certificate: {
      type: mediaSchema,
      default: () => ({}),
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

/* ==========================================================
   EXPERIENCE
========================================================== */

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    companyLogo: {
      type: mediaSchema,
      default: () => ({}),
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
/* ==========================================================
   SECTION SETTINGS
========================================================== */

const sectionSchema = new Schema(
  {
    status: {
      type: String,
      default: "Active",
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   SEO
========================================================== */

const seoSchema = new Schema(
  {
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },

    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    canonicalUrl: {
      type: String,
      trim: true,
      default: "",
    },

    ogImage: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   ABOUT SCHEMA
========================================================== */

const aboutSchema = new Schema(
  {
    introduction: {
      type: introductionSchema,
      default: () => ({}),
    },

    story: {
      type: storySchema,
      default: () => ({}),
    },

    vision: {
      type: visionSchema,
      default: () => ({}),
    },

    philosophy: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },

    mission: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },

    coreValues: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },

    futureGoals: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },

    coreCollaborations: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },

    coreCollaboratorsList: {
      type: Schema.Types.Mixed,
      default: () => [],
    },

    highlights: {
      type: [highlightSchema],
      default: [],
    },

    achievements: {
      type: [achievementSchema],
      default: [],
    },

    awards: {
      type: [awardSchema],
      default: [],
    },

    experience: {
      type: [experienceSchema],
      default: [],
    },

    sections: {
      introduction: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 1,
        }),
      },

      story: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 2,
        }),
      },

      vision: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 3,
        }),
      },

      highlights: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 4,
        }),
      },

      achievements: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 5,
        }),
      },

      awards: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 6,
        }),
      },

      experience: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 7,
        }),
      },
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    publishStatus: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: false,
  }
);

/* ==========================================================
   INDEXES
========================================================== */

aboutSchema.index({ publishStatus: 1 });
aboutSchema.index({ updatedAt: -1 });

/* ==========================================================
   SYNC HOOK
========================================================== */
aboutSchema.post('save', function(doc) {
  try {
    const mappedData = {
      name: doc.introduction?.founderName || doc.introduction?.title || "",
      title: doc.introduction?.subtitle || "",
      tagline: doc.introduction?.shortDescription || doc.introduction?.description || "",
      bio: doc.introduction?.fullBiography || doc.introduction?.description || "",
      profileImage: doc.introduction?.profileImageUrl || "",
      philosophy: {
        title: doc.philosophy?.title || "",
        paragraph: doc.philosophy?.description || "",
        image: doc.philosophy?.philosophyImageUrl || doc.philosophy?.iconUrl || ""
      },
      story: {
        heading: doc.story?.title || doc.story?.heading || "Our Story & Passion",
        content: doc.story?.description || doc.story?.storyContent || "",
        image: doc.story?.imageUrl || doc.story?.featuredVideo?.url || ""
      },
      mission: {
        title: doc.mission?.title || "Our Mission",
        description: doc.mission?.description || "",
        image: doc.mission?.missionImageUrl || doc.mission?.iconUrl || ""
      },
      vision: {
        title: doc.vision?.title || doc.vision?.visionTitle || "Mission & Vision",
        description: doc.vision?.description || doc.vision?.visionDescription || "",
        image: doc.vision?.visionImageUrl || doc.vision?.iconUrl || doc.vision?.image?.url || ""
      },
      coreValues: {
        title: doc.coreValues?.title || "Core Values",
        description: doc.coreValues?.description || "",
        image: doc.coreValues?.coreValuesImageUrl || doc.coreValues?.iconUrl || ""
      },
      heroCta: {
        text: doc.introduction?.ctaButtonText || "",
        link: doc.introduction?.ctaButtonLink || "",
        visible: doc.introduction?.buttonVisible || false,
        newTab: doc.introduction?.openInNewTab || false
      },
      credentials: (doc.highlights || []).map(h => ({
        metric: h.label || "",
        count: (h.prefix || "") + (h.number || h.value || "") + (h.suffix || "")
      })),
      experience: (doc.experience || []).map(e => ({
        period: (e.startDate ? e.startDate + " - " + (e.endDate || "Present") : e.duration || ""),
        role: e.designation || e.position || "",
        company: e.companyName || e.company || "",
        description: e.description || ""
      })),
      achievements: (doc.achievements || []).map(a => ({
        title: a.title || "",
        description: a.description || "",
        year: a.year || ""
      })),
      awards: (doc.awards || []).map(a => ({
        title: a.name || a.title || "",
        organization: a.organization || "",
        year: a.year || ""
      })),
      futureGoals: doc.futureGoals || {},
      coreCollaborations: doc.coreCollaborations || {},
      coreCollaboratorsList: doc.coreCollaboratorsList || [],
      cta: doc.cta || {}
    };
    const targetPath = "C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/about.json";
fs.promises.writeFile(targetPath, JSON.stringify(mappedData, null, 2), "utf8");
  } catch(e) {
    console.error("Failed to sync about data", e);
  }
});

/* ==========================================================
   MODEL
========================================================== */
const About = model("About", aboutSchema);

export default About;
