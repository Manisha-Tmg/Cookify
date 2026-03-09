import { Schema } from "mongoose";

let recipeSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    ingredients: {
      type: [String],
      required: [true, "ingredients is required"],
    },
    instructions: {
      type: [String],
      required: [true, "instructions is required"],
    },
    image: {
      type: String,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
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

export default recipeSchema;
