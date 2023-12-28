const catchAsyncError = require("express-async-handler");

const Coupon = require("../models/couponModel");

const { validateMongoId } = require("../utils/validateMongoId");

// Create Coupon
exports.createCoupon = catchAsyncError(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json({
      success: true,
      newCoupon,
    });
  } catch (error) {
    throw new Error(Error);
  }
});

// Get Single Coupon
exports.getSingleCoupon = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new Error("Coupon with this id is not found");
    }
    res.json({
      success: true,
      coupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get ALl Coupon
exports.getAllCoupon = catchAsyncError(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    if (coupons.length === 0) {
      throw new Error("No Coupon found ");
    }
    res.json({
      success: true,
      coupons,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Coupon
exports.updateCoupon = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new Error("Category with this id is not found");
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single Brand
exports.deleteCoupon = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      throw new Error("Coupon with this id is not found");
    }
    res.json({
      success: true,
      deletedCoupon: coupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});
