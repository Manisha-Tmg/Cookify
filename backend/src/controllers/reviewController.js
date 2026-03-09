import expressAsyncHandler from "express-async-handler";
import { Review } from "../schema/model.js";

export const createReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.create(req.body);
    res.status(201).json({
      sucess: true,
      message: "Review created sucessfully",
      result: result,
    });
    console.log(result);
  },
);

export const readAllReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.find({})
      .populate("userId", "-password")
      .populate("recipeId");
    res.status(200).json({
      success: true,
      message: "Review read sucessfully",
      result: result,
    });
    console.log(result);
  },
);

export const readSpecificReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.findById(req.params.id);
    console.log(req.params.id);

    res.status(200).json({
      sucess: true,
      message: "Review Read sucessfully by Id",
      result: result,
    });
    console.log(result);
  },
);

export const deleteReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "Review delated sucessfully",
      result: result,
    });
  },
);
