const { NextResponse } = require("next/server");

export function middleware(req: Request) {
  const alloworigins = process.env.DOMAIN_URL.split(",");
  const origin = req.headers.get("origin");
  console.log(origin);
  if (alloworigins.includes(origin)) {
    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  }

  return NextResponse.next();
}
