import nodemailer from "nodemailer";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  const message = await req.json();
  try {

    await sendConfirmationEmail();

    return NextResponse.json({
      msg: ["Sent successfully"],
      success: true
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to send."] });
    }
    
  

}
async function sendConfirmationEmail() {
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD
        },
      });

    const mailOptions = {
    from: process.env.MAIL,
    to: process.env.MAIL,
    subject: `Confirmation for Registration`,
    html: `Hello <b>bro</b>,

<p>We extend our gratitude for your enrollment in <span style="font-weight: bold; background-color: yellow;">hi</span> scheduled for February 8, 2024.</p>

<p>Your participation is confirmed!</p>

<p>The QR code for the verification process has been attached below</p>

<img src=https://api.qrserver.com/v1/create-qr-code/?size=150x150&data= alt="qrcode.jpg">

<p>We are committed to delivering an engaging, enlightening, and enjoyable experience during the event. Your attendance adds value to the occasion, and we look forward to a memorable time together.</p>

<p>Additionally, If you have any queries or need further assistance, please feel free to reach out to the Products below:</p>


<p>Wishing you a fantastic day ahead!</p>

<p>Best Regards,<br>
Team ICON</p>`
};
  
await transporter.sendMail(mailOptions);
}