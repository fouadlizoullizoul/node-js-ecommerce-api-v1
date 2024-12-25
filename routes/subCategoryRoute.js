const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");

const router = express.Router();

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

// Create a new sub-category
router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(updateSubCategoryValidator,updateSubCategory)
  .delete(deleteSubCategoryValidator,deleteSubCategory);

module.exports = router;
