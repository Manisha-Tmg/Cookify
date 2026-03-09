import { Router } from "express";
import {
  changePasswordController,
  createUserController,
  deleteUserController,
  forgotPasswordController,
  loginUserController,
  myRecipeController,
  myReviewController,
  profileUserController,
  readAllUserController,
  readSpecificUserController,
  resetPasswordController,
  updateProfileUserCOntroller,
  updateUserController,
  verifyUserController,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const userRouter = Router();

userRouter.route("/").post(createUserController).get(readAllUserController);
userRouter.route("/verify-user").patch(verifyUserController);
userRouter.route("/my-recipe").get(isAuthenticated, myRecipeController);
userRouter.route("/my-review").get(isAuthenticated, myReviewController);

userRouter
  .route("/change-password")
  .patch(isAuthenticated, changePasswordController);
userRouter.route("/forgot-password").post(forgotPasswordController);
userRouter.route("/reset-password").patch(resetPasswordController);
userRouter.route("/my-profile").get(isAuthenticated, profileUserController);
userRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateProfileUserCOntroller);
userRouter.route("/login").post(loginUserController);

userRouter
  .route("/:id")
  .get(readSpecificUserController)
  .patch(updateUserController)
  .delete(deleteUserController);

export default userRouter;
