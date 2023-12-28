const express = require("express");
const {
  getAllBlogCategory,
  createBlogCategory,
  getSingleBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controller/blogCategoryCtrl");

const router = express.Router();

router.route("/").get(getAllBlogCategory);

router.route("/new").post(createBlogCategory);

router
  .route("/:id")
  .get(getSingleBlogCategory)
  .put(updateBlogCategory)
  .delete(deleteBlogCategory);

module.exports = router;
