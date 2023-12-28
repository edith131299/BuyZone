const express = require("express");

const { authMiddleware, isAdmin } = require("../middleware/authenticate");
const {
  getAllenquiry,
  createEnquiry,
  getSingleEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require("../controller/enquiryCtrl");

const router = express.Router();

router.route("/").get(authMiddleware, isAdmin, getAllenquiry);

router.route("/new").post(authMiddleware, isAdmin, createEnquiry);

router
  .route("/:id")
  .get(authMiddleware, isAdmin, getSingleEnquiry)
  .put(authMiddleware, isAdmin, updateEnquiry)
  .delete(authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
