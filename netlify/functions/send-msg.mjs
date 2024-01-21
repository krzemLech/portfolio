import nodemailer from "nodemailer";
import { getXataClient } from "../xata";

export default async (req, context) => {
  const email = Netlify.env.get("EMAIL");
  const pass = Netlify.env.get("PASS");
  const checkUrl = Netlify.env.get("CHECK_URL");
  const appId = Netlify.env.get("APP_ID");
  const maxCount = Netlify.env.get("MAX_COUNT") || 20;
  const data = await req.json();
  let error = null;

  // gate checks for ENVs and body data
  if (!email || !pass || !checkUrl) {
    return new Response("Missing credentials", { status: 500 });
  }

  if (!data || !data.name || !data.email || !data.subject || !data.message) {
    return new Response("Missing form fields", { status: 400 });
  }

  const db_client = getXataClient();
  const now = new Date().toISOString().slice(0, 10);

  const messages_today = await db_client.db.messages
    .filter({ day: now })
    .select(["day"])
    .getAll();
  if (messages_today.length > 20) {
    return new Response("Too many messages, try tomorrow", { status: 403 });
  }
  await db_client.db.messages
    .create({
      author: data.name,
      email: data.email,
      subject: data.subject,
      text: data.message,
      day: now,
    })
    .catch((err) => {
      error = err;
    });

  // email
  let info = {};

  const text = `from: ${data.name} \n email: ${data.email} \n subject: ${data.subject} \n message: ${data.message}`;
  const html = `<p>from: ${data.name}</p> <p>email: ${data.email}</p> <p>subject: ${data.subject}</p> <p>message: ${data.message}</p>`;

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    secureConnection: false,
    auth: { user: email, pass },
  });

  async function main() {
    info = await transporter.sendMail({
      from: email,
      to: email,
      subject: "Message from portfolio",
      text,
      html,
    });
  }
  await main().catch((err) => {
    console.error(err);
    error = err;
  });
  if (error) return new Response(err, { status: 500 });
  const response = JSON.stringify({
    msg: "Message sent",
    success: true,
    messageId: info.messageId || "no id",
    countToday: messages_today.length + 1,
  });
  return new Response(response);
};
