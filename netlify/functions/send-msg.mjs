import nodemailer from "nodemailer";

export default async (req, context) => {
  const email = Netlify.env.get("EMAIL");
  const pass = Netlify.env.get("PASS");
  const data = await req.json();

  if (!email || !pass) {
    return new Response("Missing credentials", { status: 500 });
  }

  if (!data || !data.name || !data.email || !data.subject || !data.message) {
    return new Response("Missing form fields", { status: 400 });
  }

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
    const info = await transporter.sendMail({
      from: email,
      to: email,
      subject: "Message from portfolio",
      text,
      html,
    });
  }
  await main().catch(console.error);
  const response = JSON.stringify({
    msg: "Message sent",
    url: `https://forwardemail.net/my-account/emails`,
    messageId: info.messageId || "no id",
  });
  return new Response(response);
};
