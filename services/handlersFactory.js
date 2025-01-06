const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ApiError =require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.deleteOne =(Model)=> asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, `Document not found with id ${id}`));
    }
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(404, `Document not found with id ${id}`));
    }
    res
      .status(200)
      .json({ status: "success", message: "Document deleted successfully" });
  });

exports.updateOne=(Model)=> asyncHandler(async (req, res,next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return next(new ApiError(400,`document not found with id ${req.params.id}`));
    }
    const document = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!document) {
      return next(new ApiError(404,`document not found with id ${req.params.id}`));
    }
    res.status(200).json({status: 'success',data: document });
  });

exports.createOne=(Model)=> asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ status: 'success',data: newDoc  });
  });

exports.getOne =(Model)=>asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return next(new ApiError(404,`document not found with id ${id}`));
    }
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(404,`document not found with id ${id}`));
    }
    res.status(200).json({ status: 'success' ,data: document });
  });

exports.getAll =(Model,modelName = '')=>  asyncHandler(async (req, res) => {
    let filter = {};
    if(req.filterObj){
        filter = req.filterObj;
    }
    //Build query
    const countDocuments = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .search(modelName)
      .paginate(countDocuments);
    //Execute query
    const {mongooseQuery,paginationResult}=apiFeatures
    const documents = await mongooseQuery;
    res.status(200).json({ status: 'success',results: documents.length, paginationResult, data: documents });
  });