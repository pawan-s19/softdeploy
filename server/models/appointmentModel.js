const mongoose = require("mongoose");

const appointMentSchema = mongoose.Schema({
  name: String,
  contact: {
    email: String,
    phone: Number,
  },
  address: String,
  pincode: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("appointMentModel", appointMentSchema);
