const catchAsyncError = require("express-async-handler");

const Enquiry = require("../models/enquiryModel");

const { validateMongoId } = require("../utils/validateMongoId");

// Create Enquiry
exports.createEnquiry = catchAsyncError(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json({
      success: true,
      newEnquiry,
    });
  } catch (error) {
    throw new Error(Error);
  }
});

// Get Single Enquiry
exports.getSingleEnquiry = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      throw new Error("Enquiry with this id is not found");
    }
    res.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get ALl Brand
exports.getAllenquiry = catchAsyncError(async (req, res) => {
  try {
    const enquiry = await Enquiry.find();
    if (enquiry.length === 0) {
      throw new Error("No enquiry found ");
    }
    res.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Brand
exports.updateEnquiry = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      throw new Error("Enquiry with this id is not found");
    }
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Single Brand
exports.deleteEnquiry = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      throw new Error("enquiry with this id is not found");
    }
    res.json({
      success: true,
      deletedenquiry: enquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
