const { check ,body} = require("express-validator")
const { default: slugify } = require("slugify");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


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
    .withMessage("Brand name must contain only letters and numbers")
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware
];
exports.updateBrandValidator =[
    check("id").isMongoId().withMessage("Invalid Brand ID format"),
    body("name").custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware
]
exports.deleteBrandValidator =[
    check("id").isMongoId().withMessage("Invalid Brand ID format"),
    validatorMiddleware
]

