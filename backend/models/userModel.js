const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const crypto = require("crypto");

const jwtoken = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    mobile: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    role: {
      type: String,
      default: "user",
    },
    avatar: String,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String, default: "" },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordValid = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.passwordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTokenExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

let schema = mongoose.model("User", userSchema);

module.exports = schema;
