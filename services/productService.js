const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const ApiError = require("../utils/ApiError");
//@desc Get all Products
//@route GET /api/v1/products
//@access Public
exports.getProducts = asyncHandler(async (req, res) => {
  //1)Filtering
  const queryStringObj={...req.query}
  const excludesFields=['page','limit','sort','fields'];
  excludesFields.forEach(field=>delete queryStringObj[field]);
  //Apply advanced filtering using [gte,gt,lte,lt]
  let queryStr=JSON.stringify(queryStringObj);
  queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);

  //2)Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;


  //Build query
  let mongooseQuery =Product.find(JSON.parse(queryStr))
  .skip(skip)
  .limit(limit)
  .populate({ path: "category", select: "name -_id" });

  //3)Sorting
  if(req.query.sort){
    const sortBy=req.query.sort.split(',').join(' ')
    mongooseQuery=mongooseQuery.sort(sortBy)
  }else{
    mongooseQuery=mongooseQuery.sort('-createdAt')
  }
  //4) Fields Limiting
  if(req.query.fields){
    const fields=req.query.fields.split(',').join(' ')
    mongooseQuery=mongooseQuery.select(fields)
  }else{
    mongooseQuery=mongooseQuery.select('-__v')
  }
  //Execute query
  const products = await mongooseQuery
  res.status(200).json({status: "success",results: products.length,page,data: products,});
});
//@desc Get Product by ID
//@route GET /api/v1/products/:id
//@access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(404, `Product not found with id ${id}`));
  }
  const product = await Product.findById(id).populate({path:'category',select:'name -_id'});
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
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if(req.body.title){
    req.body.slug = slugify(req.body.title)
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(400, `Product not found with id ${id}`));
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(404, `Product not found with id ${id}`));
  }
  res.status(200).json({ status: "success", data: product });
});
//@desc Delete Product by ID
//@route DELETE /api/v1/products/:id
//@access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(400, `Product not found with id ${id}`));
  }
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(404, `Product not found with id ${id}`));
  }
  res
    .status(200)
    .json({ status: "success", message: "Product deleted successfully" });
});
