import express from "express";
import uploadController from "./upload.controller.js";
import { uploadMedia } from "../../middleware/upload.middleware.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, uploadMedia.single("file"), uploadController.uploadGlobalMedia);

export default router;
