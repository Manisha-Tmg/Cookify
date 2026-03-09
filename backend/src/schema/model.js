import { model } from "mongoose";
import recipeSchema from "./recipeSchema.js";
import reviewSchema from "./reviewSchema.js";
import userSchema from "./userSchema.js";

export const Recipe = model("Recipe", recipeSchema);
export const User = model("User", userSchema);
export const Review = model("Review", reviewSchema);
