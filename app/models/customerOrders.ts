import mongoose from "mongoose";

const customerOrderSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    TotalPrice: {
      type: Number,
      required: true
    },
    ProductDetails: {
      type: Array, 
      required: true,
    },
  }, {
    timestamps: true, 
  });
  
const CustomerOrders = mongoose.models.customerorders || mongoose.model('customerorders', customerOrderSchema);

export default CustomerOrders;