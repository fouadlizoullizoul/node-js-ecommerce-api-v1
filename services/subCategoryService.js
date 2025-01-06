const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  //Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObj = filterObject;
  next();
};

//@desc Create a new SubCategory
//@route POST /api/v1/subCategories
//@access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc  Get all SubCategory
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);

//@dec Get SubCategory by ID
//@route GET /api/v1/subCategories/:id
//@access Public

exports.getSubCategoryById = factory.getOne(SubCategory);

// @desc  Update SubCategory
// @route PUT /api/v1/subCategories/:id
// @access Private

exports.updateSubCategory = factory.updateOne(SubCategory);

//@desc Delete SubCategory
//@route DELETE /api/v1/subCategories/:id
//@access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
