import { Schema } from "mongoose";

let userSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // allowing user to use only one email to register
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: 200,
    },
    address: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export default userSchema;
