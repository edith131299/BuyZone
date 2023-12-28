const Razorpay = require("razorpay");
const catchAsyncError = require("express-async-handler");

const instance = new Razorpay({
  key_id: "rzp_test_zsGUOoVXrbc9fP",
  key_secret: "aLHTpF8NZaUDRWMvJjf7q1VP",
});

exports.checkout = catchAsyncError(async (req, res) => {
  const option = {
    amount: req.body.amount * 100,
    currency: "INR",
  };

  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
});
exports.paymentVerification = catchAsyncError(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;

  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
});
