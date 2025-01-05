const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Brand = require("../models/brandModel");
const ApiError =require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
//@desc Get all Brands
//@route GET /api/v1/brands
//@access Public
exports.getBrands = asyncHandler(async (req, res) => {
  //Build query
  const countDocuments = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate(countDocuments);
  //Execute query
  const {mongooseQuery,paginationResult}=apiFeatures
  const brands = await mongooseQuery;
  res.status(200).json({ status: 'success',results: brands.length, paginationResult, data: brands });
});

//@desc Get Brand by ID
//@route GET /api/v1/brands/:id
//@access Public
exports.getBrand = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ApiError(404,`brand not found with id ${id}`));
  }
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(404,`brand not found with id ${id}`));
  }
  res.status(200).json({ status: 'success' ,data: brand });
});

//@desc Create Brand
//@route POST /api/v1/brands
//@access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const brand = await Brand.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ status: 'success',data: brand  });
});

//@desc Update Brand by ID
//@route PUT /api/v1/brands/:id
//@access Private
exports.updateBrand = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ApiError(400,`brand not found with id ${id}`));
  }
  const {name} = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(404,`brand not found with id ${id}`));
  }
  res.status(200).json({status: 'success',data: brand });
});
//@desc Delete Brand by ID
//@route DELETE /api/v1/brands/:id
//@access Private

exports.deleteBrand = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ApiError(400,`brand not found with id ${id}`));
  }
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(404,`brand not found with id ${id}`));
  }
  res.status(200).json({ status: 'success',message: "Brand deleted successfully" });
});
