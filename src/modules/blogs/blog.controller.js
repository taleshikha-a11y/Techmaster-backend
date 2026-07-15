import { createCrud } from "../../common/crud.factory.js";
import Blog from "./blog.model.js";

// ==============================
// CRUD CONTROLLER
// ==============================

export const {
  create: createBlog,
  getAll: getAllBlogs,
  getById: getBlogById,
  update: updateBlog,
  delete: deleteBlog,
} = createCrud({
  Model: Blog,

  uploadFields: {
    coverImage: {
      folder: "blogs/images",
      multiple: false,
    },

    video: {
      folder: "blogs/videos",
      multiple: false,
    },
  },

  messages: {
    create: "Blog created successfully",

    getAll: "Blogs fetched successfully",

    getById: "Blog fetched successfully",

    update: "Blog updated successfully",

    delete: "Blog deleted successfully",
  },
});

import { BlogSetting } from "./blog.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const getBlogSettings = async (req, res) => {
  try {
    const settings = await BlogSetting.find({});
    // return array of {key, data} objects
    return successResponse(res, settings, "Blog settings retrieved successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateBlogSettings = async (req, res) => {
  try {
    const { key, data } = req.body;
    if (!key) return errorResponse(res, "key is required", 400);

    const updated = await BlogSetting.findOneAndUpdate(
      { key },
      { key, data },
      { new: true, upsert: true }
    );
    return successResponse(res, updated, "Blog settings updated successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};