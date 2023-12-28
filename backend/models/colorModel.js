const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", colorSchema);
