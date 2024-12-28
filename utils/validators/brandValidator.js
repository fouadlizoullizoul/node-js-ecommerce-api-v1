const { check } = require("express-validator")
const validatorMiddleware = require('../../middlewares/validatorMiddleware')


exports.getBrandValidator =[
    check("id").isMongoId().withMessage("Invalid Brand ID format"),
    validatorMiddleware
]
exports.createBrandValidator=[
    check("name")
    .notEmpty()
    .withMessage("Brand  required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Brand name must be at most 32 characters long")
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage("Brand name must contain only letters and numbers"),
    validatorMiddleware
];
exports.updateBrandValidator =[
    check("id").isMongoId().withMessage("Invalid Brand ID format"),
    validatorMiddleware
]
exports.deleteBrandValidator =[
    check("id").isMongoId().withMessage("Invalid Brand ID format"),
    validatorMiddleware
]

