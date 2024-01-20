import nodemailer from "nodemailer";
import { createClient } from "redis";

const redisConnect = async () => {
  const client = createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
};

const addToday = async () => {
  const client = await redisConnect();
  const now = new Date().toISOString().slice(0, 10);
  const num = await client.get(now);
  await client.set(now, num ? +num + 1 : 0);
  return num ? num + 1 : 0;
};

const checkToday = async () => {
  const client = await redisConnect();
  const now = new Date().toISOString().slice(0, 10);
  const today = await client.get(now);
  return today ? +today : 0;
};

export default async (req, context) => {
  const email = Netlify.env.get("EMAIL");
  const pass = Netlify.env.get("PASS");
  const redisUrl = Netlify.env.get("REDIS_URL");
  const redisPass = Netlify.env.get("REDIS_PASS");
  const maxCount = Netlify.env.get("MAX_COUNT") || 20;
  const data = await req.json();
  let error = null;

  // gate checks for ENVs and body data
  if (!email || !pass || !redisUrl || !redisPass || !maxCount) {
    return new Response("Missing credentials", { status: 500 });
  }

  if (!data || !data.name || !data.email || !data.subject || !data.message) {
    return new Response("Missing form fields", { status: 400 });
  }
  // check messages count for today
  if (checkToday() > +maxCount) {
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
    console.error(err), (error = err);
  });
  const currentCount = await addToday();
  if (error) return new Response(err, { status: 500 });
  const response = JSON.stringify({
    msg: "Message sent",
    url: `https://forwardemail.net/my-account/emails`,
    messageId: info.messageId || "no id",
    count: currentCount,
  });
  return new Response(response);
};
