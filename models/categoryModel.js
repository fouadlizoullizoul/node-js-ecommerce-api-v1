const mongoose = require("mongoose");

//Schema
const categotySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'],
        trim: true,
        maxlength : [32, 'Category name must be less than 32 characters'],
        minlength : [3, 'Category name must be more than 3 characters'],
    },
    slug: {
        type: String,
        lowercase: true,
    }
},
{timestamps: true}
);
//Model
const Category = mongoose.model('Category',categotySchema);

module.exports = Category;