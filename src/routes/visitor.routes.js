import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const HomepageSettingsModel = mongoose.models.HomepageSettings;
    if(HomepageSettingsModel) {
       const home = await HomepageSettingsModel.findOne();
       return res.json(home || {});
    }
    return res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/services", async (req, res) => {
  try {
    const ServiceModel = mongoose.models.Service;
    if(ServiceModel) {
       const services = await ServiceModel.find({});
       return res.json(services || []);
    }
    return res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/campaigns", async (req, res) => {
  try {
    const Campaign = mongoose.models.Campaign;
    if(Campaign) {
      const campaign = await Campaign.findOne({});
      if (campaign) {
        return res.json(campaign);
      }
    }
    return res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/events", async (req, res) => {
  try {
    const MasterEvent = mongoose.models.MasterEvent;
    if(MasterEvent) {
      const events = await MasterEvent.find({});
      return res.json(events || []);
    }
    return res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/videos", async (req, res) => {
  try {
    const VideoHighlightsModel = mongoose.models.VideoHighlights;
    if(VideoHighlightsModel) {
       const videos = await VideoHighlightsModel.find({});
       return res.json(videos || []);
    }
    return res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/testimonials", async (req, res) => {
  try {
    const Testimonial = mongoose.models.Testimonial;
    if(Testimonial) {
      const testimonials = await Testimonial.find({});
      return res.json(testimonials || []);
    }
    return res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
