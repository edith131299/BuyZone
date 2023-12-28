const express = require("express");

const {
  newUser,
  userLogin,
  getAllUsers,
  deleteUser,
  getSingleUser,
  updateProfile,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logOut,
  forgotPassword,
  resetPassword,
  adminUserLogin,
  getWishList,
  updateAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  deleteProductFromCart,
  updateQTFromCart,
  createOrder,
  myOrders,
  myProfile,
  changePassword,
} = require("../controller/userCtrl.js");
const { authMiddleware, isAdmin } = require("../middleware/authenticate");

const router = express.Router();

const multer = require("multer");
const path = require("path");
const {
  checkout,
  paymentVerification,
} = require("../controller/paymentCtrl.js");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "upload/user"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

/*  -----------------------User Routes ----------------------------------------------- */

router.route("/newuser").post(upload.single("avatar"), newUser);

router.route("/user/login").post(userLogin);

router.route("/user/myprofile").get(authMiddleware, myProfile);

router
  .route("/user/edit-user")
  .put(authMiddleware, upload.single("avatar"), updateProfile);

router.route("/user/save-address").put(authMiddleware, updateAddress);

router.route("/user/wishList").get(authMiddleware, getWishList);

router.route("/user/refreshtoken").get(authMiddleware, handleRefreshToken);

router.route("/user/logout").put(authMiddleware, logOut);

router.route("/user/forgotpassword").post(forgotPassword);

router.route("/user/changepassword").put(authMiddleware, changePassword);

router.route("/user/reset-password/:token").post(resetPassword);

/* ======Cart======== */

router.route("/user/add-cart").post(authMiddleware, userCart);

router.route("/user/get-cart").get(authMiddleware, getUserCart);

router
  .route("/user/delete/oneItem-cart")
  .delete(authMiddleware, deleteProductFromCart);

router.route("/user/update/quantity").put(authMiddleware, updateQTFromCart);

router.route("/user/empty-cart").delete(authMiddleware, emptyCart);

router.route("/user/apply-coupon").put(authMiddleware, applyCoupon);

/* ======Order======== */

router.route("/user/create-order").post(authMiddleware, createOrder);

router.route("/user/order/checkout").post(checkout);

router.route("/user/order/paymentVerification").post(paymentVerification);

router.route("/user/myorders").get(authMiddleware, myOrders);

// router.route("/user/all-orders").get(authMiddleware, isAdmin, getAllOrders);

// router.route("/user/order/:id").get(authMiddleware, isAdmin, getSingleOrder);

// router
//   .route("/user/update-order/:id")
//   .put(authMiddleware, isAdmin, updateOrder);

/*  -----------------------Admin Routes ----------------------------------------------- */

router.route("/admin/login").post(adminUserLogin);

router.route("/admin/users").get(authMiddleware, isAdmin, getAllUsers);

router.route("/admin/user/:id").get(authMiddleware, isAdmin, getSingleUser);

router.route("/admin/user/:id").delete(authMiddleware, isAdmin, deleteUser);

router.route("/admin/block-user/:id").put(authMiddleware, isAdmin, blockUser);

router
  .route("/admin/unblock-user/:id")
  .put(authMiddleware, isAdmin, unBlockUser);

module.exports = router;
