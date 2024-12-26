const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");


exports.setCategoryIdToBody = (req, res, next) => {
      //Nested route
    if (!req.body.category) req.body.category = req.params.categoryId;
    next()
}

//@desc Create a new SubCategory
//@route POST /api/v1/subCategories
//@access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ status: "success", data: subCategory });
});

exports.createFilterObj =(req,res,next)=>{
    let filterObject = {};
    if (req.params.categoryId) {
      filterObject = { category: req.params.categoryId };
    }
    req.filterObj = filterObject;
    next();
}


// @desc  Get all SubCategory
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subcategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  //   .populate({path:'category',select:'name -_id'});
  res.status(200).json({
    status: "success",
    results: subcategories.length,
    page,
    data: subcategories,
  });
});
//@dec Get SubCategory by ID
//@route GET /api/v1/subCategories/:id
//@access Public

exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(404, "Subcategory not found"));
  }

  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    return next(new ApiError(404, "Subcategory not found"));
  }

  res.status(200).json({ status: "success", data: subCategory });
});

// @desc  Update SubCategory
// @route PUT /api/v1/subCategories/:id
// @access Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(404, "Subcategory not found"));
  }

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!updatedSubCategory) {
    return next(new ApiError(404, "Subcategory not found"));
  }

  res.status(200).json({ status: "success", data: updatedSubCategory });
});

//@desc Delete SubCategory
//@route DELETE /api/v1/subCategories/:id
//@access Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(404, "Subcategory not found"));
  }

  const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

  if (!deletedSubCategory) {
    return next(new ApiError(404, "Subcategory not found"));
  }

  res.status(200).json({ status: "success", data: deletedSubCategory });
});
