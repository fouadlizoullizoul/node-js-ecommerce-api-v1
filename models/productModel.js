const mongoose = require("mongoose");

//Shema
const productModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Product name must be less than 100 characters"],
      minlength: [3, "Product name must be more than 3 characters"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [
        2000,
        "Product description must be less than 2000 characters",
      ],
      minlength: [20, "Product description must be more than 20 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [20, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
      maxlength: [20, "Too long product price after discount"],
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

//Model
const Product = mongoose.model('Product',productModel);

module.exports = Product;