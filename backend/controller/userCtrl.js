const { getJswToken } = require("../config/jswtoken");

const User = require("../models/userModel");

const Cart = require("../models/cartModel");

const Product = require("../models/productModel");

const Order = require("../models/orderModel");

const Coupon = require("../models/couponModel");

const catchAsyncError = require("express-async-handler");

const { sendToken } = require("../config/refreshToken");

const { validateMongoId } = require("../utils/validateMongoId");

const jwtoken = require("jsonwebtoken");

const sendEmail = require("../utils/email");

const crypto = require("crypto");

const uniqid = require("uniqid");

exports.newUser = catchAsyncError(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  console.log(req.file)

  let avatar;

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.file) {
    avatar = `${BASE_URL}/upload/user/${req.file.originalname}`;
  }
  req.body.avatar = avatar;

  if (!user) {
    const newUser = await User.create(req.body);

    sendToken(newUser, res);
  } else {
    throw new Error("User data Already exists");
  }
});

exports.userLogin = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  // const token = getJswToken(findUser._id);

  if (findUser && (await findUser.isPasswordValid(password))) {
    sendToken(findUser, res);
  } else {
    throw new Error("Invalid crendentials");
  }
});

exports.myProfile = catchAsyncError(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if(user){
    res.json({user})
  }
  else{
    throw new Error("User Does not Exist AnyMore")
  }
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  let newUserData = {
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    mobile: req?.body?.mobile,
    email: req?.body?.email,
  };
  validateMongoId(req.user._id);

   let avatar;

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.file) {
    avatar = `${BASE_URL}/upload/user/${req.file.originalname}`;
    newUserData = { ...newUserData, avatar };
  } 
  console.log(newUserData);
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidator: true,
  });

  res.json({ 
    success: true,
    user,
  });
});

exports.logOut = catchAsyncError(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie) throw new Error("No cookie present for the token");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  //check old password
  if (!(await user.isPasswordValid(req.body.oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  //assigning new password
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    success: true,
  });
});

exports.forgotPassword = catchAsyncError(async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email is not valid ");
    }

    const token = await user.passwordResetToken();
    await user.save();

    const resetUrl = `Hi please follow this link to reset your password. This Link is valid till 10 minutes from now.<a href="http://localhost:3000/user/resetpassword/${token}">Click Here</a>`;

    const data = {
      to: email,
      subject: "Forgot Password Link",
      message: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

exports.resetPassword = catchAsyncError(async (req, res) => {
  try {
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpires: { $gte: Date.now() },
    });
    if (!user) {
      throw new Error(
        "Invalid token or token got expired.Please try again later"
      );
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();
    sendToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getWishList = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);

  try {
    const user = await User.findById(id).populate("wishList");
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateAddress = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;
  validateMongoId(id);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { address: req.body.address },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.userCart = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);
  try {
    const { productId, color, quantity, price } = req.body;

    const user = await User.findById(id);

    let newCart = await new Cart({
      productId,
      color,
      quantity,
      price,
      userId: id,
    }).save();
    res.json(newCart);

    /* const alreadyExistCart = await Cart.findOne({ orderBy: id });
    if (alreadyExistCart) {
      await alreadyExistCart.deleteOne();
    }

    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i].id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i].id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }

    let cartTotal = 0;
    products.forEach((product) => {
      cartTotal = cartTotal + product.price * product.count;
    }); */
  } catch (error) {
    throw new Error(error);
  }
});

exports.getUserCart = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);

  try {
    const cart = await Cart.find({ userId: id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteProductFromCart = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);
  const { cartId } = req.body;
  try {
    const findCart = await Cart.findOne(cartId);

    if (!findCart) {
      throw new Error("Cart Not Found with this Id");
    }
    const deletedProdFromCart = await Cart.deleteOne(cartId);

    res.json({
      success: true,
      deletedProdFromCart,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateQTFromCart = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);
  const { cartId, quantity } = req.body;
  console.log(cartId, quantity);
  try {
    const findCart = await Cart.findOne({ _id: cartId });

    if (!findCart) {
      throw new Error("Cart Not Found with this Id");
    }
    const updateCartQT = await Cart.findOneAndUpdate(
      { _id: cartId },
      { quantity },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      updateCartQT,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.emptyCart = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);
  try {
    const cart = await Cart.deleteMany({ userId: id });
    res.json({
      success: true,
      deletedCart: cart,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.applyCoupon = catchAsyncError(async (req, res) => {
  const { coupon } = req.body;
  const { id } = req.user;

  try {
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findById(id);
    let { cartTotal } = await Cart.findOne({ orderBy: id }).populate(
      "products.product"
    );
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(totalAfterDiscount);
  } catch (error) {
    throw new Error(error);
  }
});

exports.createOrder = catchAsyncError(async (req, res) => {
  const { id } = req.user;

  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;

  console.log(orderItems)

  try {

    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
      user: id,
    });

    let update = orderItems.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      };
    });
    const updatedProduct = await Product.bulkWrite(update, {});
    

    res.json({
      order
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.myOrders = catchAsyncError(async (req, res) => {
  const { id } = req.user;

  try {
    const orders = await Order.find({ user: id })
      .populate("orderItems.product")
      .populate("orderItems.color");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* exports.creatOrder = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  const { cod, couponApplied } = req.body;

  try {
    const user = await User.findById(id);
    const userCart = await Cart.findOne({ orderBy: user.id });
    if (!cod) throw new Error("Create Cash Order Failed");

    let finalAmount = 0;
    if (cod && couponApplied) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderStatus: "Cash on Delivery",
      orderBy: user.id,
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    console.log(update);
    const updatedProduct = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getOrders = catchAsyncError(async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.findOne({ orderBy: id });
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getAllOrders = catchAsyncError(async (req, res) => {
  try {
    const allUserOrders = await Order.find()
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(allUserOrders);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getSingleOrder = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const order = await Order.findById(id)
      .populate("products.product")
      .populate("orderBy");
    if (!order) {
      throw new Error("No order found with this id");
    }
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateOrder = catchAsyncError(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("No Order found with id ");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedOrder);
  } catch (error) {
    throw new Error(error);
  }
}); */

/* ********************  Admin HandleBars ********************* */

//Admin Login
exports.adminUserLogin = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const findAdminUser = await User.findOne({ email });

  if (findAdminUser.role !== "admin") {
    throw new Error("Not Authorized");
  }

  // const token = getJswToken(findUser._id);

  if (findAdminUser && (await findAdminUser.isPasswordValid(password))) {
    sendToken(findAdminUser, res);
  } else {
    throw new Error("Invalid crendentials");
  }
});

//Handle refresh token

exports.handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie) throw new Error("No cookie present for the token");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user || !refreshToken)
    throw new Error("No user found for this refresh token");
  jwtoken.verify(refreshToken, process.env.JWT_SECERT_TOKEN, (err, decoded) => {
    if (err || user._id !== decoded?.id) throw new Error("Invalid token");
  });
  const accessToken = getJswToken(user._id);
  res.json({
    accessToken,
  });
};

//Admin:Get all users - /api/admin/users

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    res.json({
      message: "No users found",
    });
  }

  res.json({
    success: true,
    Users: users,
  });
});

//Admin: Get single user - /api/admin/:id

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  validateMongoId(req.params.id);
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error(`User not found with this id ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Admin: Delete User data - /api/admin/:id

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  validateMongoId(req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.blockUser = catchAsyncError(async (req, res, next) => {
  validateMongoId(req.params.id);

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("User not found with this id");
  }
  (user.isBlocked = true), await user.save();
  res.json({
    success: true,
    isBlocked: user.isBlocked,
  });
});

exports.unBlockUser = catchAsyncError(async (req, res, next) => {
  validateMongoId(req.params.id);

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("User not found with this id");
  }
  (user.isBlocked = false), await user.save();
  res.json({
    success: true,
    isBlocked: user.isBlocked,
  });
});
