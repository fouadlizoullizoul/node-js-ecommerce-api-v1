const { check } = require("express-validator");
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
    .withMessage("Category name must contain only letters and numbers"),
    validatorMiddleware
];
exports.updateCategoryValidator =[
    check("id").isMongoId().withMessage("Invalid Category ID format"),
    validatorMiddleware
]
exports.deleteCategoryValidator =[
    check("id").isMongoId().withMessage("Invalid Category ID format"),
    validatorMiddleware
]