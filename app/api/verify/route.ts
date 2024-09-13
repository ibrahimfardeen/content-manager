import nodemailer from "nodemailer";
import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  const { event, verify } = await req.json();
  try {
    await connectDB();
    await Contact.updateOne({ "_id" : event._id },
    { $set: { "verified" : verify } });
    console.log('updated');
    if(verify)
    await sendConfirmationEmail(event);

    return NextResponse.json({
      msg: ["Verified successfully"],
      success: true
    });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: ["Unable to verify."] });
    }
    
  
}
function getRandomHex() {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
}
async function sendConfirmationEmail(event) {
  var coordinators = {
    "ADRENALINE RUSH":{
      co1:{
            name:"Suhail I",
            num: "9789096170",
          },
      co2:{
            name:"Choumya M",
            num: "8925059696",
          }
    },
    "ALGO-RHYTHM":{
      co1:{
            name:"Mohamed Moideen Halith",
            num: "8248725391",
          },
      co2:{
            name:"Prem Kumar V",
            num: "9884497635",
          }
    },
    "DATABASE DETECTIVES":{
      co1:{
            name:"Syed Riyaz K",
            num: "7010651296",
          },
      co2:{
            name:"Fariha Hiba",
            num: "9962608021",
          }
    },
    "IGNITE THE STAGE":{
      co1:{
            name:"Salman",
            num: "6380393289",
          },
      co2:{
            name:"Jabir",
            num: "9500332770",
          }
    },
    "IPL AUCTION":{
      co1:{
            name:"Mohamed Afsar",
            num: "9443059885",
          },
      co2:{
            name:"Mohamed Suhail B",
            num: "9962292623",
          }
    },
    "PAPER-DE-FIESTA":{
      co1:{
            name:"Abdul Rahman M S",
            num: "9884416875",
          },
      co2:{
            name:"Shafla Fathima",
            num: "7092763661",
          }
    },
    "TECH QUEST":{
      co1:{
            name:"Kailash G",
            num: "7200580860",
            },
      co2:{
            name:"Kamalesh K B",
            num: "8608125396",
          }
    },
    "VOXRECK":{
      co1:{
            name:"Ameerdeen S",
            num: "9159385501",
          },
      co2:{
            name:"Jeevida R",
            num: "7305712495",
          }
    }
  }
    var co1name = coordinators[event.eventname].co1.name;
    var co1num = coordinators[event.eventname].co1.num;
    var co2name = coordinators[event.eventname].co2.name;
    var co2num = coordinators[event.eventname].co2.num;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
      },
    });
  
    const mailOptions = {
    from: 'your@icon2k24symposium@gmail.com',
    to: event.email,
    subject: `Confirmation for ${event.eventname} Registration`,
    html: `Hello <b>${event.fullname}</b>,

<p>We extend our gratitude for your enrollment in <span style="font-weight: bold; background-color: yellow;">${event.eventname}</span> scheduled for February 8, 2024.</p>

<p>Your participation is confirmed!</p>

<p>The QR code for the verification process has been attached below</p>

<img src=https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event._id} alt="qrcode.jpg">

<p>We are committed to delivering an engaging, enlightening, and enjoyable experience during the event. Your attendance adds value to the occasion, and we look forward to a memorable time together.</p>

<p>Additionally, If you have any queries or need further assistance, please feel free to reach out to the contacts below:</p>

<p>${co1name} : ${co1num}<br>
${co2name} : ${co2num}</p>

<p>Wishing you a fantastic day ahead!</p>

<p>Best Regards,<br>
Team ICON</p>`
};
  
await transporter.sendMail(mailOptions);
}