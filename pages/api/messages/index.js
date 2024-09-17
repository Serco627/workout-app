import dbConnect from "@/db/connect";
import Message from "@/db/models/Message";

async function handler(request, response) {
  dbConnect();
  if (request.method === "GET") {
    const messages = await Message.find();
    response.status(200).json(messages);
  }
}

export default handler;
