import expressAsyncHandler from "express-async-handler";
import { Recipe, Review, User } from "../schema/model.js";
import { sendEmail } from "../utils/sendMail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export const createUserController = expressAsyncHandler(
  async (req, res, next) => {
    const hasssedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      fullName: req.body.fullName,
      password: hasssedPassword,
      email: req.body.email,
      image: req.body.image,
      role: req.body.role,
    };
    const result = await User.create(data);

    const details = {
      id: result.id,
    };

    const expiryInfo = {
      expiresIn: "1h",
    };
    const token = await jwt.sign(details, secretKey, expiryInfo);

    await sendEmail({
      from: "Verification <uniquekc425@gmail.com>",
      to: data.email,
      subject: "Verify Your Email Address",
      html: `
  <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
    
    <!-- Header -->
    <div style="background:#4f46e5;color:#ffffff;padding:20px;text-align:center;">
      <h1 style="margin:0;font-size:24px;">Email Verification</h1>
    </div>

    <!-- Body -->
    <div style="padding:24px;color:#374151;">
      <p style="font-size:16px;">Hi there 👋</p>

      <p style="font-size:15px;line-height:1.6;">
        Thank you for registering. Please confirm your email address by clicking the button below.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a 
          href="http://localhost:3000/verify-user?token=${token}"
          style="
            background:#4f46e5;
            color:#ffffff;
            padding:12px 24px;
            text-decoration:none;
            border-radius:6px;
            font-size:16px;
            display:inline-block;
          "
        >
          Verify Email
        </a>
      </div>

      

      <p style="font-size:14px;color:#6b7280;margin-top:20px;">
        If you didn’t create an account, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
      © ${new Date().getFullYear()}Cookify.com. All rights reserved.
    </div>

  </div>
  `,
    });
    res.status(201).json({
      sucess: true,
      message: "Verification link send to Email",
      result: result,
    });
  },
);
export const verifyUserController = expressAsyncHandler(
  async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      const verifyToken = await jwt.verify(token, secretKey);
      const result = await User.findByIdAndUpdate(
        verifyToken.id,
        {
          isVerified: true,
        },
        { new: true },
      );

      res.status(200).json({
        sucess: true,
        message: "User verified sucessfully",
        result: result,
      });
    }
  },
);

export const loginUserController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await User.findOne({ email: req.body.email });
    console.log(result);
    if (result == null) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        result.password,
      );
      console.log(validPassword);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      } else {
        const details = {
          id: result.id,
        };
        const expiryInfo = {
          expiresIn: "1h",
        };
        const token = await jwt.sign(details, secretKey, expiryInfo);
        res.status(200).json({
          success: true,
          message: "Login Sucessful",
          result: result,
          token: token,
        });
      }
    }
  },
);

export const readAllUserController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await User.find({});
    res.status(200).json({
      sucess: true,
      message: "User read sucessfully",
      result: result,
    });
    console.log(result);
  },
);

export const readSpecificUserController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await User.findById(req.params.id);
    console.log(req.params.id);

    res.status(200).json({
      sucess: true,
      message: "User Read sucessfully by Id",
      result: result,
    });
  },
);
export const profileUserController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.id;
    let result = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User found",
      result: result,
    });
  },
);

export const updateProfileUserCOntroller = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      result: result,
    });
  },
);

export const updateUserController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      sucess: true,
      message: "User updated sucessfully",
      result: result,
    });
  },
);

export const deleteUserController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "User delated sucessfully",
      result: result,
    });
  },
);

export const changePasswordController = expressAsyncHandler(
  async (req, res, next) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const data = await User.findById(req.id);
    const isValidPassword = await bcrypt.compare(oldPassword, data.password);

    if (isValidPassword && newPassword === confirmPassword) {
      const hasssedPassword = await bcrypt.hash(newPassword, 10);

      const result = await User.findByIdAndUpdate(
        req.id,
        {
          password: hasssedPassword,
        },
        { new: true },
      );
      res.status(200).json({
        sucess: true,
        message: "Password changed  sucessfully",
        result: result,
      });
    }
  },
);
export const forgotPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await User.findOne({ email: req.body.email });
    const details = {
      id: result.id,
    };
    const expiryInfo = {
      expiresIn: "1h",
    };
    const token = await jwt.sign(details, secretKey, expiryInfo);
    console.log(token);
    await sendEmail({
      from: "Cookify <uniquekc425@gmail.com>",
      to: req.body.email,
      subject: "Reset Your Password - Cookify",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
      
      <p style="color: #555; font-size: 16px;">
        Hello,
      </p>
      
      <p style="color: #555; font-size: 16px;">
        We received a request to reset your password. Click the button below to set a new password.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:3000/user/reset-password?token=${token}" 
           style="background-color: #4CAF50; color: #ffffff; padding: 12px 25px; 
                  text-decoration: none; border-radius: 5px; font-size: 16px; 
                  display: inline-block;">
          Reset Password
        </a>
      </div>


      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="color: #999; font-size: 13px; text-align: center;">
        If you did not request a password reset, please ignore this email.
      </p>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
      © ${new Date().getFullYear()}Cookify.com. All rights reserved.
    </div>
      
    </div>
  </div>
  `,
    });
    res.status(200).json({
      sucess: true,
      message: `Reset Password link send on the ${req.body.email}`,
      result: result,
    });
  },
);
export const resetPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const details = await jwt.verify(token, secretKey);
    if (details) {
      let newPassword = req.body.newPassword;
      let confirmPassword = req.body.confirmPassword;
      if (newPassword !== confirmPassword) {
        res.status(401).json({
          success: false,
          message: "New password and confirm password do not match.",
        });
      }
      const hassedPassword = await bcrypt.hash(newPassword, 10);
      const result = await User.findByIdAndUpdate(
        details.id,
        {
          password: hassedPassword,
        },
        { new: true },
      );
      res.status(201).json({
        success: true,
        message: "Password updated successfully",
        result: result,
      });
    }
  },
);

export const myRecipeController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await Recipe.find({ user: req.id }).populate("user");
    res.status(201).json({
      success: true,
      message: "My recipes fetched successfully",
      result: result,
    });
  },
);

export const myReviewController = expressAsyncHandler(
  async (req, res, next) => {
    const result = await Review.find({ user: req.id }).populate("userId");
    res.status(201).json({
      success: true,
      message: "My recipes fetched successfully",
      result: result,
    });
  },
);
/* 
get email
checks email exist or not
emailexist send token in that email
*/
