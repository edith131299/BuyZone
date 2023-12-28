const { default: slugify } = require("slugify");

const Product = require("../models/productModel");

const User = require("../models/userModel");

const catchAsyncError = require("express-async-handler");
const { validateMongoId } = require("../utils/validateMongoId");

exports.createProduct = catchAsyncError(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    let base_url = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      base_url = `${req.protocol}://${req.get("host")}`;
    }
    let images = [];
    if (req.files?.length > 0) {
      req.files.map((file) => {
        let url = `${base_url}/upload/product/${file.originalname}`;
        images.push({ image: url });
      });
    }

    req.body.images = images;

    const product = await Product.create(req.body);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.uploadImages = catchAsyncError(async (req, res, next) => {
  console.log(req.files);
});

exports.getSingleProduct = catchAsyncError(async (req, res) => {
  try {
    validateMongoId(req.params.id);
    const product = await Product.findById(req?.params?.id)
      .populate("color")
      .populate("ratings.postedBy");
    if (!product) {
      throw new Error("Product not found with this id");
    }
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
  try {
  
    //filtering
    const queryObj = { ...req.query };
    const excludes = ["page", "sort", "limit", "fields", "search"];
    excludes.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    //Search

    if (req.query.search) {
      const search = query.find({
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      });

      query = search;
    } else {
      query = query;
    }

    //Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.sort("-__v");
    }
    //Pagination
    const page = req.query?.page;
    const limit = req.query?.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }

    const products = await query;
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateProduct = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  validateMongoId(id);
  try {
    if (req.body.title) {
      req.slug = slugify(req.body.title);
    }
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found with this id");
    }
    let images = [];
    if (req.body.imagesCleared === "false") {
      images = product.images;
    }
    let base_url = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      base_url = `${req.protocol}://${req.get("host")}`;
    }

    if (req.files.length > 0) {
      req.files.map((file) => {
        let url = `${base_url}/upload/product/${file.originalname}`;
        images.push({ image: url });
      });
    }

    req.body.images = images;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteProduct = catchAsyncError(async (req, res) => {
  try {
    validateMongoId(req.params.id);
    const product = await Product.findByIdAndDelete(req?.params?.id);
    if (!product) {
      throw new Error("Product not found with this id");
    }
    res.json({
      success: true,
      message: "This product has been deleted succesfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.addToWishlist = catchAsyncError(async (req, res) => {
  const { id } = req.user;

  const { prodId } = req.body;
  validateMongoId(prodId);
  try {
    const user = await User.findById(id);

    const wishList = user.wishList.find((id) => id.toString() === prodId);

    if (wishList) {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishList: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishList: prodId },
        },
        {
          new: true,
        }
      );

      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.rating = catchAsyncError(async (req, res) => {
  const { id } = req.user;

  const { prodId, star, comment } = req.body;

  validateMongoId(prodId);
  try {
    const product = await Product.findById(prodId);

    const alreadyRated = product.ratings.find(
      (rating) => rating.postedBy.toString() === id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: { ratings: { star: star, comment: comment, postedBy: id } },
        },
        {
          new: true,
        }
      );
    }

    const ratedProduct = await Product.findById(prodId);
    const totalRatings = ratedProduct.ratings.length;

    let ratingSum = ratedProduct.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);

    let averageRating = Math.round(ratingSum / totalRatings);

    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: averageRating,
      },
      {
        new: true,
      }
    )
      .populate("ratings.postedBy")
      .populate("color");

    res.json({ product: finalProduct });
  } catch (error) {
    throw new Error(error);
  }
});
