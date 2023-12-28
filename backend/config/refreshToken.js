const User = require("../models/userModel");
const { getJswToken } = require("./jswtoken");

exports.sendToken = async (user, res) => {
  const token = getJswToken(user._id);
  const refreshToken = token;

  user.refreshToken = token;
  await user.save();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIES * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(201).cookie("refreshToken", refreshToken, options).json({
    success: true,
    user,
    token,
  });
};
