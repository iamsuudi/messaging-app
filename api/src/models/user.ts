import mongoose, { Document } from "mongoose";

export interface UserType extends Document {
	name?: string;
	email?: string;
	id?: string;
	bio?: string;
	username?: string;
	picture?: string;
}

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	bio: String,
	passwordHash: String,
	email: String,
	picture: String,
});

/* eslint no-param-reassign: 0, no-underscore-dangle: 0 */
userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model("User", userSchema);

export default User;
