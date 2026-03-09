import { Router } from "express";
import {
  createRecipeController,
  deleteRecipeController,
  readAllRecipeController,
  readSpecificRecipeController,
  updateRecipeController,
} from "../controllers/recipeController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const recipeRouter = Router();

recipeRouter
  .route("/")
  .post(isAuthenticated, createRecipeController)
  .get(readAllRecipeController);

recipeRouter
  .route("/:id")
  .get(readSpecificRecipeController)
  .patch(updateRecipeController)
  .delete(deleteRecipeController);

export default recipeRouter;
