const express = require("express");
const {
  getAllCoupon,
  createCoupon,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");

const { authMiddleware, isAdmin } = require("../middleware/authenticate");

const router = express.Router();

router.route("/").get(authMiddleware, isAdmin, getAllCoupon);

router.route("/new").post(authMiddleware, isAdmin, createCoupon);

router
  .route("/:id")
  .get(authMiddleware, isAdmin, getSingleCoupon)
  .put(authMiddleware, isAdmin, updateCoupon)
  .delete(authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
