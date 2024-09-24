import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    trim: true,
  },

  price: {
    type: String,
    required: [true, "Please enter your email."]
  },

  description: {
    type: String,
    required: [true, "Please enter your college name."],
    trim: true,
  },

  photo: {
    type: String,
    required: [true, "Paymentfile is required."],
  },

  updated: {
    type: Date,
  },

  created: {
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;