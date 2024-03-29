const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema = new Schema({
  fileId: String,
  s3Key: String,
  fileName: String,
  fileSize: Number,
  mimeType: String,
  createdAt: Date,
  modifiedAt: Date,
  userId: String,
  markedDeleted: Boolean,
  starred: Boolean,
  tagIds: Array,
});

mongoose.model("files", fileSchema);
