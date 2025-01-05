const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require('./handlersFactory')

//@desc Get all Products
//@route GET /api/v1/products
//@access Public
exports.getProducts = asyncHandler(async (req, res) => {

  //Build query
  const countDocuments = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search("Products")
    .paginate(countDocuments);
  //Execute query
  const {mongooseQuery,paginationResult}=apiFeatures
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ status: "success", results: products.length,paginationResult, data: products});
});
//@desc Get Product by ID
//@route GET /api/v1/products/:id
//@access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(404, `Product not found with id ${id}`));
  }
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(new ApiError(404, `Product not found with id ${id}`));
  }
  res.status(200).json({ status: "success", data: product });
});

//@desc Create Product
//@route POST /api/v1/products
//@access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ status: "success", data: product });
});

//@desc Update Product by ID
//@route PUT /api/v1/products/:id
//@access Private
exports.updateProduct = factory.updateOne(Product);

//@desc Delete Product by ID
//@route DELETE /api/v1/products/:id
//@access Private
exports.deleteProduct=factory.deleteOne(Product)

