export default async (req, context) => {
  const response = JSON.stringify({ msg: "Hello, world!" });
  return new Response(response);
};
