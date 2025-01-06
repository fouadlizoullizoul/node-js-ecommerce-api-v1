const { check ,body} = require("express-validator")
const { default: slugify } = require("slugify");
const validatorMiddleware = require('../../middlewares/validatorMiddleware')


exports.getCategoryValidator =[
    check("id").isMongoId().withMessage("Invalid Category ID format"),
    validatorMiddleware
]
exports.createCategoryValidator=[
    check("name")
    .notEmpty()
    .withMessage("Category  required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Category name must be at most 32 characters long")
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage("Category name must contain only letters and numbers")
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware
];
exports.updateCategoryValidator =[
    check("id").isMongoId().withMessage("Invalid Category ID format"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware
]
exports.deleteCategoryValidator =[
    check("id").isMongoId().withMessage("Invalid Category ID format"),
    validatorMiddleware
]

