import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
	picture: String,
	name: String,
});

/* eslint no-param-reassign: 0, no-underscore-dangle: 0 */
groupSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
