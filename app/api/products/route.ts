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
      data: data,
      result: responseObj(data)
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
                            "name": "''4.jpg",
                            "alternativeText": products[i].name,
                            "caption": null,
                            "width": 500,
                            "height": 500,
                            "formats": {
                                "thumbnail": {
                                    "ext": ".jpg",
                                    "url": products[i].photo,
                                    "hash": "thumbnail_4_e4a930dfc9",
                                    "mime": "image/jpeg",
                                    "name": "thumbnail_''4.jpg",
                                    "path": null,
                                    "size": 1.63,
                                    "width": 156,
                                    "height": 156,
                                    "sizeInBytes": 1626
                                }
                            },
                            "hash": "4_e4a930dfc9",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 9.04,
                            "url": products[i].photo,
                            "previewUrl": null,
                            "provider": "strapi-provider-upload-strapi-cloud",
                            "provider_metadata": null,
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