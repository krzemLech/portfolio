import nodemailer from "nodemailer";
import { getXataClient } from "../xata";

export default async (req, context) => {
  const email = Netlify.env.get("EMAIL");
  const pass = Netlify.env.get("PASS");
  const checkUrl = Netlify.env.get("CHECK_URL");
  const appId = Netlify.env.get("APP_ID");
  const data = await req.json();
  let error = null;

  // gate checks for ENVs and body data
  if (!email || !pass || !checkUrl) {
    return new Response("Missing credentials", { status: 500 });
  }

  const db_client = getXataClient();
  const db_data = await db_client["portfolio-db"].messages.getAll();

  return new Response(JSON.stringify({ msg: "xata connected 7", db_data }));

  // const canSend = await fetch(checkUrl).then((res) => res.json(), {
  //   headers: { "x-app-id": appId },
  // });

  return new Response(JSON.stringify({ ...canSend, "x-app-id": appId }));

  if (!data || !data.name || !data.email || !data.subject || !data.message) {
    return new Response("Missing form fields", { status: 400 });
  }
  const client = await redisConnect();
  const count = await checkToday(client);
  // check messages count for today
  if (count > +maxCount) {
    return new Response("Too many messages", { status: 503 });
  }

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
    url: `https://forwardemail.net/my-account/emails`,
    messageId: info.messageId || "no id",
    count,
  });
  return new Response(response);
};
