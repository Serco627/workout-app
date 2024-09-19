import dbConnect from "@/db/connect";
import Message from "@/db/models/Message";

async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const messages = await Message.find();
    response.status(200).json(messages);
  }
  if (request.method === "POST") {
    const message = request.body;
    await Message.create(message);
    response.status(201).json({ status: "created" });
  }
}

export default handler;
