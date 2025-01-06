const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");
//@desc Get all Brands
//@route GET /api/v1/brands
//@access Public
exports.getBrands = factory.getAll(Brand);

//@desc Get Brand by ID
//@route GET /api/v1/brands/:id
//@access Public
exports.getBrand = factory.getOne(Brand);

//@desc Create Brand
//@route POST /api/v1/brands
//@access Private
exports.createBrand = factory.createOne(Brand);

//@desc Update Brand by ID
//@route PUT /api/v1/brands/:id
//@access Private
exports.updateBrand = factory.updateOne(Brand);

//@desc Delete Brand by ID
//@route DELETE /api/v1/brands/:id
//@access Private

exports.deleteBrand = factory.deleteOne(Brand);
