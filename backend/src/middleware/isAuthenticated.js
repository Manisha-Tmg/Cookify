import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization.split(" ")[1];
  if (bearerToken) {
    const details = await jwt.verify(bearerToken, secretKey);
    req.id = details.id;
    next();
  } else {
   return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});
export default isAuthenticated;
