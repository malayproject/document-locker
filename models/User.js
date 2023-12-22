const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  googleProfile: Object,
});

mongoose.model("users", userSchema);
