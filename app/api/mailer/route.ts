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

    var productDetailsContent = '<table>';
    productDetailsContent += '<tr>';
    productDetailsContent += '<th>Name</th>';
    productDetailsContent += '<th>Price</th>';
    productDetailsContent += '<th>Quantity</th>';
    productDetailsContent += '<th>Total</th>';
    productDetailsContent += '</tr>';
    for(let i of productDetails){
      productDetailsContent += '<tr>';
      productDetailsContent += '<td>' + i.name + '</td>';
      productDetailsContent += '<td>' + i.price + '</td>';
      productDetailsContent += '<td>' + i.quantity + '</td>';
      productDetailsContent += '<td>' + i.price * i.quantity + '</td>';
      productDetailsContent += '</tr>';
    }
    productDetailsContent += '<tr>';
    productDetailsContent += '<td colspan="3">' + + '</td>';
    productDetailsContent += '<td>' + data.TotalPrice + '</td>';
    productDetailsContent += '</tr>';
    productDetailsContent += '</table>';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD
        },
      });
    var date = new Date();

    const mailOptions = {
    from: process.env.MAIL,
    to: data.Email,
    subject: `Your Order Has Been Successfully Placed!`,
    html: `<p>Dear ${data.Name}</p>,

<p>Thank you for shopping with KVM CMart! We are pleased to inform you that your order has been successfully placed. Our team is processing it, and we will notify you once it's ready for shipment.</p>

<p>Order Details:</p>
Order Number: 123456
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