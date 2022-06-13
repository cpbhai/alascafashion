const orderModel = require("../models/order.model");

exports.placeOrder = async (req, res) => {
  try {
    req.body.orderedBy = req.user._id;
    const order = await orderModel.create(req.body);
    res.cookie("cart", JSON.stringify([])).status(200).json({
      success: true,
      data: order,
      message: "Your Order has been Placed:)",
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};
