import connectDB from "@/app/lib/mongodb";
import CustomerOrders from "@/app/models/customerOrders";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const {
    Name,
    Email,
    PhoneNumber,
    Location,
    Address,
    TotalPrice,
    ProductDetails,
  } = await request.json();

  try {
    await connectDB();
    await CustomerOrders.create({
      Name,
      Email,
      PhoneNumber,
      Address,
      Location,
      TotalPrice,
      ProductDetails,
    });

    return NextResponse.json(
      { msg: "Order submitted Successfully", success: true },
      {
        status: 200,
        headers: getCorsHeaders(request.headers.get("origin") || ""),
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: getCorsHeaders(request.headers.get("origin") || ""),
      }
    );
  }
}
