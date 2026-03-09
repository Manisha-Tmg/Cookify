import { Schema } from "mongoose";

let reviewSchema = Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    recipeId: {
      type: Schema.ObjectId,
      ref: "Recipe",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
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

export default reviewSchema;
