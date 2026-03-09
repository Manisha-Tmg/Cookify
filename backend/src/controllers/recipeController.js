import expressAsyncHandler from "express-async-handler";
import { Recipe, Review, User } from "../schema/model.js";

export const createRecipeController = expressAsyncHandler(
  async (req, res, next) => {
    req.body.user = req.id;
    let result = await Recipe.create(req.body);
    res.status(201).json({
      sucess: true,
      message: "Recipe created sucessfully",
      result: result,
    });
    console.log(result);
  },
);

export const readAllRecipeController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Recipe.find({}).populate("user");
    const review = await Review.find({})
      .populate("userId", "-password")
      .populate("recipeId");
    res.status(200).json({
      sucess: true,
      message: "Recipe read sucessfully",
      result: result,
      review: review,
    });
  },
);

export const readSpecificRecipeController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Recipe.findById(req.params.id).populate("user");
    const review = await Review.find({ recipeId: req.params.id })
      .populate("userId", "-password")
      .populate("recipeId");
    res.status(200).json({
      sucess: true,
      message: "Recipe Read sucessfully by Id",
      result: result,
      review: review,
    });
  },
);

export const updateRecipeController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      sucess: true,
      message: "Recipe updated sucessfully",
      result: result,
    });
  },
);

export const deleteRecipeController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "Recipe delated sucessfully",
      result: result,
    });
  },
);

export const totalController = expressAsyncHandler(async (req, res, next) => {
  let totalRecipe = await Recipe.countDocuments();
  let totalUser = await User.countDocuments();
  let totalReview = await Review.countDocuments();
  res.status(200).json({
    sucess: true,
    message: "Recipe delated sucessfully",
    totalRecipe: totalRecipe,
    totalUser: totalUser,
    totalReview: totalReview,
  });
});
