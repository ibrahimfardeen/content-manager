import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  const { eventname } = await req.json();

  try {
    await connectDB();
    var data = [];
    if(eventname == '')
        data = await Product.find({},{paymentfile:0});//
    else
        data = await Product.find({eventname: eventname},{paymentfile:0});

    // console.log(JSON.stringify(data));
    return NextResponse.json({
      msg: ["Data fetched successfully"],
      success: true,
      data: data.reverse()
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to get message."] });
    }
  }