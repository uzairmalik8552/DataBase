const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Executive Director", "Member"],
    default: "Member",
  },
  name: {
    type: String,
    required: true,
  },
  executiveDirector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
