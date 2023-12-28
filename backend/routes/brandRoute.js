const express = require("express");

const {
  getAllBrand,
  createBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brandCtrl");

const { authMiddleware, isAdmin } = require("../middleware/authenticate");

const router = express.Router();

router.route("/").get(authMiddleware, isAdmin, getAllBrand);

router.route("/new").post(authMiddleware, isAdmin, createBrand);

router
  .route("/:id")
  .get(authMiddleware, isAdmin, getSingleBrand)
  .put(authMiddleware, isAdmin, updateBrand)
  .delete(authMiddleware, isAdmin, deleteBrand);

module.exports = router;
