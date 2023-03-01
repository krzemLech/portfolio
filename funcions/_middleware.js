import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "Porftolio mail", email: "krzemmo@gmail.com" }],
    },
  ],
  from: { name: "Enquiry", email: "no-reply@krzemportfolio.com" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});
