import nodemailer from "nodemailer";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  const { product } = await req.json();
  try {
    await connectDB();
    await Product.deleteOne({ "_id" : product.id });
    console.log('deleted');

    return NextResponse.json({
      msg: ["Deleted successfully"],
      success: true
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to delete."] });
    }
    
}