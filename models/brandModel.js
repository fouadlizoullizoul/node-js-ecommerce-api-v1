const mongoose = require("mongoose");

//Schema
const brandSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Brand name is required'],
        unique: [true, 'Brand name must be unique'],
        trim: true,
        maxlength : [32, 'Brand name must be less than 32 characters'],
        minlength : [3, 'Brand name must be more than 3 characters'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image:String,
},
{timestamps: true}
);
//Model
const Brand = mongoose.model('Brand',brandSchema);

module.exports = Brand;