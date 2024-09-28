import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Result } from "postcss";
export async function POST(req) {
  const { eventname } = await req.json();

  try {
    await connectDB();
    var data = [];
    if(eventname == '')
        data = await Product.find();//
    else
        data = await Product.find();

    // console.log(JSON.stringify(data));
    return NextResponse.json({
      msg: ["Data fetched successfully"],
      success: true,
      //data: data,
      data: responseObj(data)
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to get message."] });
    }
    
  function responseObj(products) {

    // implement resource here
    var result = {
      data: []
    };

  for(var i in products) {
    var dataObj = {
            "id": products[i]._id,
            "attributes": {
                "Name": products[i].name,
                "Price": products[i].price,
                "Desc": products[i].description,
                "createdAt": products[i].created,
                "updatedAt": products[i].updated,
                "publishedAt": products[i].created,
                "img": {
                    "data": {
                        "id": products[i]._id,
                        "attributes": {
                            "alternativeText": products[i].name,
                            "formats": {
                                "thumbnail": {
                                    "url": products[i].photo,
                                }
                            },
                            "url": products[i].photo,
                            "createdAt": products[i].created,
                            "updatedAt": products[i].updated
                        }
                    }
                }
            }
        };
        result.data.push(dataObj);
    }
    return result;
  }
}