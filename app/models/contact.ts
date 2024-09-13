import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your name."],
    trim: true,
  },
  
  teammembers: {
    type: Array,
    trim: true
  },

  email: {
    type: String,
    required: [true, "Please enter your email."]
  },

  phonenumber: {
    type: Number,
    required: [true, "Please enter your phone number."],
    trim: true,
  },

  collegename: {
    type: String,
    required: [true, "Please enter your college name."],
    trim: true,
  },

  department: {
    type: String,
    required: [true, "Please enter your department."],
    trim: true,
  },

  year: {
    type: String,
    required: [true, "Please select your year of study."],
    trim: true,
  },

  eventname: {
    type: String,
    required: [true, "Event is required."],
    trim: true,
  },

  paymentfile: {
    type: String,
    required: [true, "Paymentfile is required."],
  },

  date: {
    type: Date,
    default: Date.now,
  },
  
  verified: {
    type: Boolean,
    default: false
  }
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;