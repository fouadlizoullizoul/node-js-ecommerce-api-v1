const { check ,body} = require("express-validator")
const { default: slugify } = require("slugify");

const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getSubCategoryValidator =[
    check("id").isMongoId().withMessage("Invalid Category ID format"),
    validatorMiddleware
]

exports.createSubCategoryValidator=[
    check("name")
    .notEmpty()
    .withMessage("SubCategory  required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be at most 32 characters long")
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage("SubCategory name must contain only letters and numbers")
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    check("category")
    .notEmpty()
    .withMessage("Category  required")
    .isMongoId()
    .withMessage("Invalid Category ID format"),
    validatorMiddleware
]

exports.updateSubCategoryValidator=[
    check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware
]

exports.deleteSubCategoryValidator=[
    check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
    validatorMiddleware
]