import express from "express";
import upload from "../../middleware/upload.middleware.js";

import {
  getSettings,
  updateSettings,
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getFeaturedJobs,
  getActiveJobs,
} from "./job.controller.js";

const router = express.Router();

router.get("/settings", getSettings);
router.put("/settings", updateSettings);


router.post(
  "/create",
  upload.fields([
    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  createJob
);

router.get("/", getAllJobs);

router.get("/featured", getFeaturedJobs);

router.get("/active", getActiveJobs);

router.get("/:id", getJobById);

router.put(
  "/:id",
  upload.fields([
    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  updateJob
);

router.delete("/:id", deleteJob);

export default router;