import uploadFile from "../../utils/uploadFile.js";

const uploadGlobalMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Determine folder based on mime type
    const folder = req.file.mimetype.startsWith("video") ? "3d-project-videos" : "3d-project-images";
    
    // Upload directly from memory buffer
    const result = await uploadFile(req.file.buffer, folder);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: result.url,
      type: result.type,
      format: result.format
    });
  } catch (error) {
    console.error("Global upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload file to Cloudinary" });
  }
};

export default { uploadGlobalMedia };
