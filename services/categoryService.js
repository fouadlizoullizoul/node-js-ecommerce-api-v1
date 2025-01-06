const Category = require("../models/categoryModel");
const factory = require('./handlersFactory')

//@desc Get all Categories
//@route GET /api/v1/categories
//@access Public
exports.getCategories = factory.getAll(Category)
//@desc Get Category by ID
//@route GET /api/v1/categories/:id
//@access Public
exports.getCategory = factory.getOne(Category)

//@desc Create Category
//@route POST /api/v1/categories
//@access Private
exports.createCategory = factory.createOne(Category)

//@desc Update Category by ID
//@route PUT /api/v1/categories/:id
//@access Private
exports.updateCategory = factory.updateOne(Category);

//@desc Delete Category by ID
//@route DELETE /api/v1/categories/:id
//@access Private
exports.deleteCategory = factory.deleteOne(Category)

