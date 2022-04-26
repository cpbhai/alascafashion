const orderModel = require("../models/order-model");
const errorResponse = require("../utils/errorResponse");

exports.placeOrder = async (req, res) => {
  try {
    req.body.orderedBy = req.user._id;
    const order = await orderModel.create(req.body);
    res
      .status(200)
      .json({
        success: true,
        data: order,
        message: "Your Order has been Placed:)",
      });
  } catch (err) {
    errorResponse(res, err);
  }
};
