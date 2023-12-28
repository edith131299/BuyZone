const express = require("express");
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
} = require("../controller/productCtrl");

const router = express.Router();

const { authMiddleware, isAdmin } = require("../middleware/authenticate");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages");

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "upload/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
//User Route
router.route("/:id").get(getSingleProduct);

router.route("/").get(getAllProducts);

router.route("/wishlist").put(authMiddleware, addToWishlist);

router.route("/rating").put(authMiddleware, rating);

//Admin Route
router
  .route("/create")
  .post(authMiddleware, isAdmin, upload.array("images"), createProduct);

router
  .route("/update/:id")
  .put(authMiddleware, isAdmin, upload.array("images"), updateProduct);

router.route("/delete/:id").post(authMiddleware, isAdmin, deleteProduct);

module.exports = router;
