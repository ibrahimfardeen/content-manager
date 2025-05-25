import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";
import { Result } from "postcss";
const getCorsHeaders = (origin: string) => {
  const headers = {
    "Access-Control-Allow-Methods": process.env.ALLOWED_METHODS,
    "Access-Control-Allow-Headers": process.env.ALLOWED_HEADERS,
    "Access-Control-Allow-Origin": "*",
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

export async function POST(req) {
  const { message } = await req.json();
  try {
    await connectDB();
    var data = [];
    data = await Product.find();

    // console.log(JSON.stringify(data));
    // console.log(req.header.origin)
    return NextResponse.json({
      msg: ["Data fetched successfully.."],
      success: true,
      data: responseObj(data),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: ["Unable to get message.."] });
  }

  function responseObj(products) {
    // implement resource here
    var result = {
      
      data: {}
    };

    for (var i in products) {
      if(!result.data.hasOwnProperty(products[i].category)){
          result.data[products[i].category] = {
            data: [{id: products[i]._id,
              attributes: {
                Name: products[i].name,
                Price: products[i].price,
                Desc: products[i].description,
                createdAt: products[i].created,
                updatedAt: products[i].updated,
                publishedAt: products[i].created,
                img: {
                  data: {
                    id: products[i]._id,
                    attributes: {
                      alternativeText: products[i].name,
                      formats: {
                        thumbnail: {
                          url: products[i].photo,
                        },
                      },
                      url: products[i].photo,
                      createdAt: products[i].created,
                      updatedAt: products[i].updated,
                    },
                  },
                },
              },}]
          }
      }else{
        result.data[products[i].category].data.push({
          id: products[i]._id,
              attributes: {
                Name: products[i].name,
                Price: products[i].price,
                Desc: products[i].description,
                createdAt: products[i].created,
                updatedAt: products[i].updated,
                publishedAt: products[i].created,
                img: {
                  data: {
                    id: products[i]._id,
                    attributes: {
                      alternativeText: products[i].name,
                      formats: {
                        thumbnail: {
                          url: products[i].photo,
                        },
                      },
                      url: products[i].photo,
                      createdAt: products[i].created,
                      updatedAt: products[i].updated,
                    },
                  },
                },
              },
        })
      }
    }

    return result;
  }
}
