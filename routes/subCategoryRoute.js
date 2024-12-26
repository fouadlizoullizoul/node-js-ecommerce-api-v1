const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj
} = require("../services/subCategoryService");



const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");
//mergeParmas: Allow us to access the params from the parent router 
//ex /api/v1/categories/:categoryId/subcategories we need to access categoryId from category router
const router = express.Router({mergeParams:true});

// Create a new sub-category
router
  .route("/")
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
  .get(createFilterObj,getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(updateSubCategoryValidator,updateSubCategory)
  .delete(deleteSubCategoryValidator,deleteSubCategory);

module.exports = router;
