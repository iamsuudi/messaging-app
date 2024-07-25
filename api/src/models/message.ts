import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	content: String,
	date: Date,
	seen: { type: Boolean, default: false },
});

/* eslint no-param-reassign: 0, no-underscore-dangle: 0 */
messageSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
