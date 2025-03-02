const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAuthenticated: { type: Boolean, required: true },
  userIdWithGoogle: { type: String, default: "" },
  userIdWithGithub: { type: String, default: "" },
  userName: { type: String, required: true, minlength: 3 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
