import { Router } from "express";
import { totalController } from "../controllers/recipeController.js";

const totalCountRouter = Router();

totalCountRouter.route("/").get(totalController);

export default totalCountRouter;
