const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const subscriberModel = require("../models/subscriber-model");
const errorResponse = require("../utils/errorResponse");
const { addProduct } = require("../middlewares/validatepayload");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const sendEmail = require("../utils/sendEmail");

exports.addProduct = async (req, res) => {
  try {
    req.body = await addProduct(req.body, req.user._id);
    const product = await productModel.create(req.body);
    const projectFields = {
      images: product.images,
      title: product.title,
      _id: product._id,
      thumbnail: product.thumbnail,
    };
    userModel.find({ role: "Client" }).exec((err, users) => {
      if (err) return console.log("Error while sending mail-1", err);
      users.map((each) => {
        sendEmail("new-product", {
          email: each.email,
          product: projectFields,
        });
      });
    });
    subscriberModel.find().exec((err, users) => {
      if (err) return console.log("Error while sending mail-2", err);
      users.map((each) => {
        sendEmail("new-product", {
          email: each.email,
          product: projectFields,
        });
      });
    });
    res.status(200).json({
      success: true,
      data: product,
      message: "Your Product is live now",
    });
  } catch (err) {
    if (req.body.images) {
      const cloudinary = require("cloudinary");
      req.body.images.forEach((data) =>
        cloudinary.v2.uploader.destroy(data.public_id)
      );
    }
    // console.log(err);
    errorResponse(res, err);
  }
};

exports.specific = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params._id))
      throw { message: "No such product was found" };
    const product = await productModel.aggregate([
      {
        $match: {
          _id: ObjectId(req.params._id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $unwind: "$subcategory",
      },
    ]);
    if (product.length == 0) throw { message: "No such product was found" };
    res.status(200).json({ success: true, data: product[0] });
  } catch (err) {
    errorResponse(res, err);
  }
};
exports.get = async (req, res) => {
  try {
    let {
      getQuery,
      keyword,
      category,
      subcategory,
      low,
      high,
      page,
      sortBy,
      type,
      exclude,
    } = req.query;
    if (page) page = Number(page);
    else page = 1;
    const { get } = require("../utils/aggregation"),
      productsPerPage = 10;
    const query = get(
      keyword,
      category,
      subcategory,
      low,
      high,
      page,
      sortBy,
      productsPerPage,
      type,
      exclude
    );
    if (getQuery) return res.send(query);
    let products = await productModel.aggregate(query),
      response = { productsPerPage };
    if (products.length) {
      response.products = products[0].afterPaginate;
      response.page = page;
      response.noOfPages = Math.ceil(
        parseFloat(products[0].beforePaginate.count) / productsPerPage
      );
    } else {
      response.products = [];
      response.page = page;
      response.noOfPages = 0;
    }
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    errorResponse(res, err);
  }
};
