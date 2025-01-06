const { check ,body} = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product Required")
    .custom((val,{req})=>{
      req.body.slug=slugify(val);
      return true;
  }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  check("sold").optional().isNumeric().withMessage("Sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a number")
    .isFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error("Price after discount must be less than price");
      }
      return true;
    }),
  check("colors").optional().isArray().withMessage("Colors must be an array"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          throw new Error(`Category not found with id ${categoryId}`);
        }
      })
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            throw new Error(
              `SubCategory not found with id ${subcategoriesIds}`
            );
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          //check if subcategories ids in database include subcategories in req.body
          const checker =(target,arr)=> target.every((v)=>arr.includes(v))
          if(!checker(val,subCategoriesIdsInDB)){
            throw new Error(`SubCategory not belong to category`);
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Rating must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  body("title").optional().custom((val,{req})=>{
    req.body.slug=slugify(val);
    return true;
}),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware,
];
