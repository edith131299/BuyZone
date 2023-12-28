const express = require("express");
const {
  getAllCategory,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryCtrl");

const router = express.Router();

router.route("/").get(getAllCategory);

router.route("/new").post(createCategory);

router
  .route("/:id")
  .get(getSingleCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
