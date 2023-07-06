import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  length: { type: Number, required: true },
  chunkSize: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
});

const File = mongoose.model("File", FileSchema);
export default File;
