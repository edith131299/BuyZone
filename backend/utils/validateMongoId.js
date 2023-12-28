const mongoose = require("mongoose");

exports.validateMongoId = (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) throw new Error("This id is not valid or Not found");
};
