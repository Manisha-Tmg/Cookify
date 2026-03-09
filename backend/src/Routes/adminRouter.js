import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  changePasswordController,
  createAdminController,
  forgotPasswordController,
  loginAdminController,
  resetPasswordController,
  updateProfileAdminCOntroller,
  verifyAdminController,
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.route("/").post(createAdminController);
adminRouter.route("/verify-user").patch(verifyAdminController);

adminRouter
  .route("/change-password")
  .patch(isAuthenticated, changePasswordController);
adminRouter.route("/forgot-password").post(forgotPasswordController);
adminRouter.route("/reset-password").patch(resetPasswordController);
adminRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateProfileAdminCOntroller);
adminRouter.route("/login").post(loginAdminController);

export default adminRouter;
