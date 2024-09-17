import dbConnect from "@/db/connect";
import Message from "@/db/models/Message";

async function handler(request, response) {
  try {
    await dbConnect(); // Ensure you await this
    if (request.method === "GET") {
      const messages = await Message.find();
      return response.status(200).json(messages);
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

export default handler;
