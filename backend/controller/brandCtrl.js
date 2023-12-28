const catchAsyncError = require("express-async-handler");

const Brand = require("../models/brandModel");

const { validateMongoId } = require("../utils/validateMongoId");

// Create Brand
exports.createBrand = catchAsyncError(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json({
      success: true,
      newBrand,
    });
  } catch (error) {
    throw new Error(Error);
  }
});

// Get Single Brand
exports.getSingleBrand = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new Error("Category with this id is not found");
    }
    res.json({
      success: true,
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get ALl Brand
exports.getAllBrand = catchAsyncError(async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands) {
      throw new Error("No category found ");
    }
    res.json({
      success: true,
      brands,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Brand
exports.updateBrand = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new Error("Category with this id is not found");
    }
    const updatedbrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedbrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single Brand
exports.deleteBrand = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      throw new Error("Category with this id is not found");
    }
    res.json({
      success: true,
      deletedBrand: brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
