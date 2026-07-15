import Job, { JobSetting } from './job.model.js';

export const createJobRepository = async (payload) => {
  return await Job.create(payload);
};

export const getAllJobRepository = async () => {
  return await Job.find().sort({ createdAt: -1 });
};

export const getJobByIdRepository = async (id) => {
  return await Job.findById(id);
};

export const updateJobRepository = async (id, payload) => {
  return await Job.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteJobRepository = async (id) => {
  return await Job.findByIdAndDelete(id);
};

export const getFeaturedJobsRepository = async () => {
  return await Job.find({
    featured: true,
    active: true,
  }).sort({ createdAt: -1 });
};

export const getActiveJobsRepository = async () => {
  return await Job.find({
    active: true,
  }).sort({ createdAt: -1 });
};

// Settings
export const getSettingsRepository = async () => {
  return await JobSetting.findOne({});
};

export const updateSettingsRepository = async (data) => {
  let doc = await JobSetting.findOne({});
  if (!doc) {
    doc = new JobSetting(data);
  } else {
    Object.assign(doc, data);
  }
  await doc.save();
  return doc;
};
