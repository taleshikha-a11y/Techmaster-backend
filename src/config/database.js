import mongoose from "mongoose";
import { syncModelToJson } from "../utils/syncToJson.js";

// Global JSON Sync Plugin
mongoose.plugin((schema) => {
  schema.post(['save', 'findOneAndUpdate', 'findOneAndDelete', 'deleteOne', 'updateOne', 'insertMany'], async function () {
    // For document middleware (save), 'this' is the document. For query middleware, 'this' is the query.
    const modelName = this.modelName || (this.model && this.model.modelName) || (this.constructor && this.constructor.modelName);
    if (modelName) {
      await syncModelToJson(modelName);
    }
  });
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`o. MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("?O MongoDB Connection Failed:");
    console.error(error); 
    process.exit(1);
  }
};

export default connectDB;