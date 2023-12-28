const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authenticate");
const {
  getAllColor,
  createColor,
  getSingleColor,
  updateColor,
  deleteColor,
} = require("../controller/colorCtrl");

const router = express.Router();

router.route("/").get(authMiddleware, isAdmin, getAllColor);

router.route("/new").post(authMiddleware, isAdmin, createColor);

router
  .route("/:id")
  .get(authMiddleware, isAdmin, getSingleColor)
  .put(authMiddleware, isAdmin, updateColor)
  .delete(authMiddleware, isAdmin, deleteColor);

module.exports = router;
