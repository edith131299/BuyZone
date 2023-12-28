const catchAsyncError = require("express-async-handler");

const Color = require("../models/colorModel");

const { validateMongoId } = require("../utils/validateMongoId");

// Create Color
exports.createColor = catchAsyncError(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json({
      success: true,
      newColor,
    });
  } catch (error) {
    throw new Error(Error);
  }
});

// Get Single Color
exports.getSingleColor = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const color = await Color.findById(id);
    if (!color) {
      throw new Error("Color with this id is not found");
    }
    res.json({
      success: true,
      color,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get ALl Brand
exports.getAllColor = catchAsyncError(async (req, res) => {
  try {
    const colors = await Color.find();
    if (colors.length === 0) {
      throw new Error("No colors found ");
    }
    res.json({
      success: true,
      colors,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Brand
exports.updateColor = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const color = await Color.findById(id);
    if (!color) {
      throw new Error("Color with this id is not found");
    }
    const updatedcolor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedcolor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single Brand
exports.deleteColor = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const color = await Color.findByIdAndDelete(id);
    if (!color) {
      throw new Error("Color with this id is not found");
    }
    res.json({
      success: true,
      deletedcolor: color,
    });
  } catch (error) {
    throw new Error(error);
  }
});
