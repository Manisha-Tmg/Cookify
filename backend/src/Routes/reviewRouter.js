import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  readAllReviewController,
  readSpecificReviewController,
} from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .post(createReviewController)
  .get(readAllReviewController);

reviewRouter
  .route("/:id")
  .get(readSpecificReviewController)
  .delete(deleteReviewController);

export default reviewRouter;
