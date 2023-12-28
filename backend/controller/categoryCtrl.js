const catchAsyncError = require("express-async-handler");

const Category = require("../models/categoryModel");

const { validateMongoId } = require("../utils/validateMongoId");

// Create Category
exports.createCategory = catchAsyncError(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json({
      success: true,
      category: newCategory,
    });
  } catch (error) {
    throw new Error(Error);
  }
});

// Get Single Category
exports.getSingleCategory = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category with this id is not found");
    }
    res.json({
      success: true,
      category,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get ALl Category
exports.getAllCategory = catchAsyncError(async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      throw new Error("No category found ");
    }
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Category
exports.updateCategory = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category with this id is not found");
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single Category
exports.deleteCategory = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new Error("Category with this id is not found");
    }
    res.json({
      success: true,
      deletedCategory: category,
    });
  } catch (error) {
    throw new Error(error);
  }
});
