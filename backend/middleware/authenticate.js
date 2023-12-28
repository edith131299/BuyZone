const jwtoken = require("jsonwebtoken");

const userModel = require("../models/userModel");

const catchAsyncError = require("express-async-handler");

exports.authMiddleware = catchAsyncError(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new Error("Login First to handle the resources");
  }

  const decoded = jwtoken.verify(refreshToken, process.env.JWT_SECERT_TOKEN);

  req.user = await userModel.findById(decoded.id);

  next();
});

exports.isAdmin = (req, res, next) => {
  if (req?.user?.role === "admin") {
    next();
  } else {
    throw new Error("role user is not allowed");
  }
};

/* const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECERT_TOKEN);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
}); */
