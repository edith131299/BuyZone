const catchAsynError = require("express-async-handler");

const Blog = require("../models/blogCardModel");
const { validateMongoId } = require("../utils/validateMongoId");

exports.createBlog = catchAsynError(async (req, res) => {
  try {
    const blog = await Blog.create(req?.body);
    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getSingleBlog = catchAsynError(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);

    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No Blog not found with this id");
    }
    blog.numViews = blog.numViews + 1;
    await blog.save();

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getAllBlog = catchAsynError(async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length === 0) {
      throw new Error("No Blog found");
    }
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateBlog = catchAsynError(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);

    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No Blog not found with this id");
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteBlog = catchAsynError(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);

    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No Blog not found with this id");
    }

    await Blog.findByIdAndDelete(id);
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.LiketheBlog = catchAsynError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  const blog = await Blog.findById(id);

  const logInUserId = req.user._id;

  const isLiked = blog.isLiked;

  const alreadyDisliked = blog.dislikes.find(
    (userId) => userId.toString() === logInUserId.toString()
  );

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $pull: { dislikes: logInUserId },
        isDisliked: false,
      },
      { new: true }
    );
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $pull: { likes: logInUserId },
        isLiked: false,
      },
      { new: true }
    );
  } else {
    const blog = await Blog.findByIdAndUpdate(id, {
      $push: { likes: logInUserId },
      isLiked: true,
    });
  }

  res.json({
    success: true,
    blog,
  });
});
exports.dislikeBlog = catchAsynError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  const blog = await Blog.findById(id);

  const logInUserId = req.user._id;

  const isDisliked = blog?.isDisliked;

  const alreadyLiked = blog.likes.find(
    (userId) => userId.toString() === logInUserId.toString()
  );

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $pull: { likes: logInUserId },
        isLiked: false,
      },
      { new: true }
    );
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $pull: { dislikes: logInUserId },
        isDisliked: false,
      },
      { new: true }
    );
  } else {
    const blog = await Blog.findByIdAndUpdate(id, {
      $push: { dislikes: logInUserId },
      isDisliked: true,
    });
  }

  res.json({
    success: true,
    blog,
  });
});
3;
