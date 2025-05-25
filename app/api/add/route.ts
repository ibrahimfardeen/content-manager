import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, price, description, photo, category } = await req.json();

  try {
    await connectDB();

    await Product.create({category,name, price, description, photo, updated: new Date() });

    //await sendConfirmationEmail(fullname, email);
    const data = await Product.find({category})
    return NextResponse.json({
      msg: ["Registered successfully"],
      success: true,
      data
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      // console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to register."] });
    }
  }
}
