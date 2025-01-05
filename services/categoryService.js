const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const ApiError =require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
//@desc Get all Categories
//@route GET /api/v1/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res) => {
    //Build query
    const countDocuments = await Category.countDocuments();
    const apiFeatures = new ApiFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search()
      .paginate(countDocuments);
    //Execute query
    const {mongooseQuery,paginationResult}=apiFeatures
    const categories = await mongooseQuery;

  res.status(200).json({ status: 'success',results: categories.length, paginationResult, data: categories });
});
//@desc Get Category by ID
//@route GET /api/v1/categories/:id
//@access Public
exports.getCategory = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ApiError(404,`category not found with id ${id}`));
  }
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(404,`category not found with id ${id}`));
  }
  res.status(200).json({ status: 'success' ,data: category });
});

//@desc Create Category
//@route POST /api/v1/categories
//@access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const category = await Category.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ status: 'success',data: category  });
});

//@desc Update Category by ID
//@route PUT /api/v1/categories/:id
//@access Private
exports.updateCategory = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ApiError(400,`category not found with id ${id}`));
  }
  const {name} = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(404,`category not found with id ${id}`));
  }
  res.status(200).json({status: 'success',data: category });
});
//@desc Delete Category by ID
//@route DELETE /api/v1/categories/:id
//@access Private

exports.deleteCategory = asyncHandler(async (req, res,next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ApiError(400,`category not found with id ${id}`));
  }
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(404,`category not found with id ${id}`));
  }
  res.status(200).json({ status: 'success',message: "Category deleted successfully" });
});
