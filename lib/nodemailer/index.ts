import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";

export const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export async function generateEmailContent(
  product: EmailProductInfo,
  type: NotificationType
) {
  const shortenedTitle =
    product.title.length > 20
      ? `{product.title.substring(0, 20)}...`
      : product.title;
  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `Welcome to Price Tracker`;
      body = `Hi there, <br/> <br/> Welcome to Price Tracker. <br/> <br/> We will notify you when the price of ${shortenedTitle} drops below your threshold. <br/> <br/> Happy Shopping!`;
      break;
    case Notification.CHANGE_OF_STOCK:
      subject = `Change of Stock for ${shortenedTitle}`;
      body = `Hi there, <br/> <br/> The stock for ${shortenedTitle} has changed. <br/> <br/> Happy Shopping!`;
      break;
    case Notification.LOWEST_PRICE:
      subject = `Lowest Price for ${shortenedTitle}`;
      body = `Hi there, <br/> <br/> The price for ${shortenedTitle} has dropped below your threshold. <br/> <br/> Happy Shopping!`;
      break;
    case Notification.THRESHOLD_MET:
      subject = `Threshold Met for ${shortenedTitle}`;
      body = `Hi there, <br/> <br/> The price for ${shortenedTitle} has dropped below your threshold. <br/> <br/> Happy Shopping!`;
      break;
    default:
      break;
  }
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "email.outlook.com",
    pass: "process.env.EMAIL_PASSWORD",
  },
  maxConnections: 1,
});

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const mailOptions = {
    from: "javascriptmastery@outlook.com",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);

    console.log("Email sent: ", info);
  });
};
