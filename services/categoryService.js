const Category = require('../models/categoryModel');
exports.getCategories=(req,res)=>{
    const name=req.body
    Category.create(name).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
}
