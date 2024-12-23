const mongoose = require("mongoose");

//Schema
const categotySchema = new mongoose.Schema({
    name:String,
})
//Model
const Category = mongoose.model('Category',categotySchema);

module.exports = Category;