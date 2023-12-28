const catchAsyncError = require("express-async-handler");

const BlogCategory = require("../models/blogCategoryModel");

const { validateMongoId } = require("../utils/validateMongoId");

// Create Category
exports.createBlogCategory = catchAsyncError(async (req, res) => {
  try {
    const newBlogCategory = await BlogCategory.create(req.body);
    res.json({
      success: true,
      category: newBlogCategory,
    });
  } catch (error) {
    throw new Error(Error);
  }
});

// Get Single Category
exports.getSingleBlogCategory = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory) {
      throw new Error("Category with this id is not found");
    }
    res.json({
      success: true,
      blogCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get ALl Category
exports.getAllBlogCategory = catchAsyncError(async (req, res) => {
  try {
    const blogCategories = await BlogCategory.find();
    if (!blogCategories) {
      throw new Error("No category found ");
    }
    res.json({
      success: true,
      blogCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Category
exports.updateBlogCategory = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory) {
      throw new Error("Category with this id is not found");
    }
    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      updatedBlogCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single Category
exports.deleteBlogCategory = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blogCategory = await BlogCategory.findByIdAndDelete(id);
    if (!blogCategory) {
      throw new Error("Category with this id is not found");
    }
    res.json({
      success: true,
      deletedBlogCategory: category,
    });
  } catch (error) {
    throw new Error(error);
  }
});
