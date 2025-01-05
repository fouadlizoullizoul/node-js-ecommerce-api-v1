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