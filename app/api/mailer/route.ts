import nodemailer from "nodemailer";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  const data = await req.json();
  try {

    await sendConfirmationEmail(data);

    return NextResponse.json({
      msg: ["Sent successfully"],
      success: true
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to send."] });
    }
}
async function sendConfirmationEmail(data) {

    var productDetails = data.ProductDetails;
    var tableCSS = 'style="border:1px solid black;border-collapse:collapse;"'
    var productDetailsContent = `<table ${tableCSS}>`;
    productDetailsContent += `<tr ${tableCSS}>`;
    productDetailsContent += `<th ${tableCSS}>Name</th>`;
    productDetailsContent += `<th ${tableCSS}>Price</th>`;
    productDetailsContent += `<th ${tableCSS}>Quantity</th>`;
    productDetailsContent += `<th ${tableCSS}>Total(&#8377;)</th>`;
    productDetailsContent += `</tr>`;
    for(let i of productDetails){
      productDetailsContent += `<tr ${tableCSS}>`;
      productDetailsContent += `<td ${tableCSS}>` + i.name + `</td>`;
      productDetailsContent += `<td ${tableCSS}>` + i.price + `</td>`;
      productDetailsContent += `<td ${tableCSS}>` + i.quantity + `</td>`;
      productDetailsContent += `<td ${tableCSS}>` + i.price * i.quantity + `</td>`;
      productDetailsContent += `</tr>`;
    }
    productDetailsContent += `<tr ${tableCSS}>`;
    productDetailsContent += `<td ${tableCSS} colspan="3"><b>Grand total</b></td>`;
    productDetailsContent += `<td ${tableCSS}><b>` + data.TotalPrice + `</b></td>`;
    productDetailsContent += `</tr>`;
    productDetailsContent += `</table>`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD
        },
      });
    var date = new Date().toLocaleString();

    const mailOptions = {
    from: process.env.MAIL,
    to: data.Email,
    subject: `Your Order Has Been Successfully Placed!`,
    html: `<p>Dear ${data.Name},</p>

<p>Thank you for shopping with KVM CMart! We are pleased to inform you that your order has been successfully placed. Our team is processing it, and we will notify you once it's ready for shipment.</p>

<p><b>Order Details:</b></p>
Order Number: 123456<br>
Date: ${date}
<p>Below is a summary of your order:</p>
${productDetailsContent}

<p>You can track your order and find more details in your account on our website. If you have any questions or need further assistance, feel free to reach out to us at info@kvmcmart.in</p>

<p>We appreciate your business and look forward to serving you again.</p>

<p>Best regards,</p>
<p>KVM CMart Team</p>`
};
  
await transporter.sendMail(mailOptions);
}