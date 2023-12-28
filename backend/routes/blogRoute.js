const express = require("express");
const {
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  LiketheBlog,
  dislikeBlog,
} = require("../controller/blogCtrl");
const { authMiddleware } = require("../middleware/authenticate");

const router = express.Router();

router.route("/create").post(createBlog);

router.route("/").get(getAllBlog);

router.route("/:id").get(getSingleBlog);

router.route("/update/:id").put(updateBlog);

router.route("/delete/:id").delete(deleteBlog);

router.route("/like-blog/:id").put(authMiddleware, LiketheBlog);

router.route("/dislike-blog/:id").put(authMiddleware, dislikeBlog);

module.exports = router;
