const mongoose =require('mongoose')

const subCategorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Sub Category name is required'],
            unique: [true, 'Sub Category name must be unique'],
            trim: true,
            maxlength : [32, 'Sub Category name must be less than 32 characters'],
            minlength : [2, 'Sub Category name must be more than 2 characters'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        parent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required: [true, 'SubCategory must be belong to parent category ']
        },
    },
{
    timestamps:true
});

module.exports = mongoose.model('SubCategory', subCategorySchema);