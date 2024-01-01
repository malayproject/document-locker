const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagId: String,
  tagName: String,
  userId: String,
  createdAt: Date,
  modifiedAt: Date,
});

mongoose.model("tags", tagSchema);
