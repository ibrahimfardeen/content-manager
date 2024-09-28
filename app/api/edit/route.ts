import nodemailer from "nodemailer";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  const { id, name, price, description, photo } = await req.json();
  try {
    await connectDB();
    await Product.updateOne({ "_id" : id },
    { $set: { "name" : name, "price" : price, "description" : description, "photo" : photo, updated: new Date()} });
    console.log('updated');

    return NextResponse.json({
      msg: ["Verified successfully"],
      success: true
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to verify."] });
    }
    
}