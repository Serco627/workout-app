import mongoose from "mongoose";

const { Schema } = mongoose;
const messageSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
