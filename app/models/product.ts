import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  category: {
    type: String,
    required: [true, "Please enter Category."],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Please enter Product ame."],
    trim: true,
  },

  price: {
    type: String,
    required: [true, "Please enter your email."],
  },

  description: {
    type: String,
    required: [true, "Please enter product Desc."],
    trim: true,
  },

  photo: {
    type: String,
    required: [true, "Image is required"],
  },

  updated: {
    type: Date,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
