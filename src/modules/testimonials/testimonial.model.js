import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const testimonialSchema = new mongoose.Schema(
  {
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

// Synchronization Hook
const syncToFile = async () => {
  try {
    const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial");
    const allTestimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    
    // Map data to visitor's format if needed, but it's flexible
    const dataToWrite = allTestimonials.map(item => {
      return {
        id: item._id.toString(),
        name: item.name || "",
        role: item.role || item.company || "",
        avatar: item.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        quote: item.quote || "",
        story: item.story || "",
        rating: item.rating || 5,
        course: item.course || ""
      };
    });

    const targetPath = path.resolve("C:/Users/tales/Downloads/Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data/testimonials.json");
fs.promises.writeFile(targetPath, JSON.stringify(dataToWrite, null, 2), "utf8");
    console.log("Successfully synced testimonials to visitor website.");
  } catch (err) {
    console.error("Failed to sync testimonials to JSON:", err.message);
  }
};

testimonialSchema.post('save', syncToFile);
testimonialSchema.post('findOneAndUpdate', syncToFile);
testimonialSchema.post('findOneAndDelete', syncToFile);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;