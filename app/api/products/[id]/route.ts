import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import mongoose from "mongoose";
import { Result } from "postcss";

// Define the dynamic route handler

const getCorsHeaders = (origin: string) => {
  const headers = {
    "Access-Control-Allow-Methods": process.env.ALLOWED_METHODS,
    "Access-Control-Allow-Headers": process.env.ALLOWED_HEADERS,
    "Access-Control-Allow-Origin": ""
  };
  if (process.env.DOMAIN_URL.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin; 
  }

  return headers;
};

export const OPTIONS = async (request: NextRequest) => {
  console.log("getting in ");
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const {message} = await request.json()
    try {
      await connectDB();
      var data = await Product.findOne({"_id": id});
  
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
      
    function responseObj(product) {
  
      // implement resource here
      return {
        data: {
              "id": product._id,
              "attributes": {
                  "Name": product.name,
                  "Price": product.price,
                  "Desc": product.description,
                  "createdAt": product.created,
                  "updatedAt": product.updated,
                  "publishedAt": product.created,
                  "img": {
                      "data": {
                          "id": product._id,
                          "attributes": {
                              "alternativeText": product.name,
                              "formats": {
                                  "thumbnail": {
                                      "url": product.photo,
                                  }
                              },
                              "url": product.photo,
                              "createdAt": product.created,
                              "updatedAt": product.updated
                          }
                      }
                  }
              }
          }
      };
    }
  }