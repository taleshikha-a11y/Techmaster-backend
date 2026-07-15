import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const syncToFile = async () => {
  try {
    const Blog = mongoose.models.Blog;
    const BlogSetting = mongoose.models.BlogSetting;
    
    if (!Blog || !BlogSetting) return;

    const items = await Blog.find({}).sort({ createdAt: -1 }).lean();
    const settingsList = await BlogSetting.find({}).lean();
    
    const settings = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.data;
      return acc;
    }, {});

    const dataDir = path.resolve(__dirname, '../../../../../Tech-master-main (1)/Tech-master-main/TechMasterSher/src/data');
    
    if (fs.existsSync(dataDir)) {
      const mappedBlogs = items.map(item => ({
        id: item._id,
        title: item.title || '',
        excerpt: item.excerpt || '',
        content: item.content || '',
        date: item.publishDate || '',
        readTime: item.readTime || '',
        coverImage: item.coverImage || '',
        tags: [item.category].filter(Boolean),
        category: item.category || ''
      }));
fs.promises.writeFile(path.join(dataDir, "blogs.json"), JSON.stringify(mappedBlogs, null, 2), "utf8");

fs.promises.writeFile(path.join(dataDir, "blogSettings.json"), JSON.stringify(settings, null, 2), "utf8");
      console.log('Successfully synced Blog JSON files');
    }
  } catch (err) {
    console.error('Error syncing Blog JSON files', err);
  }
};

const blogSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
blogSchema.post('save', syncToFile);
blogSchema.post('findOneAndUpdate', syncToFile);
blogSchema.post('findOneAndDelete', syncToFile);
blogSchema.post('findOneAndReplace', syncToFile);

const blogSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

blogSettingSchema.post('save', syncToFile);
blogSettingSchema.post('findOneAndUpdate', syncToFile);
blogSettingSchema.post('findOneAndDelete', syncToFile);
blogSettingSchema.post('findOneAndReplace', syncToFile);

export const BlogSetting = mongoose.model('BlogSetting', blogSettingSchema);
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;