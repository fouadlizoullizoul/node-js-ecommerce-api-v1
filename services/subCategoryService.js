const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const SubCategory = require("../models/subCategoryModel");
const ApiError =require("../utils/ApiError");


//@desc Create a new SubCategory
//@route POST /api/v1/subCategories
//@access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
    const {name,category} = req.body;
    const subCategory = await SubCategory.create({
      name,
      slug: slugify(name),
    category
    });
    res.status(201).json({ status: 'success',data: subCategory  });
  });