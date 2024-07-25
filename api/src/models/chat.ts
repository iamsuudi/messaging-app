import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
	group: Boolean,
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

/* eslint no-param-reassign: 0, no-underscore-dangle: 0 */
chatSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
