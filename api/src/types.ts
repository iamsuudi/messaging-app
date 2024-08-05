import mongoose from "mongoose";

export interface ContactType {
	id: string;
	contact?: Express.User | null;
}

export interface PersonalChatFormatted {
	id: string;
	receiver?: Express.User | null;
	messages?: MessageFormat[];
}

export interface GroupChatFormatted {
	id: string;
	owner?: Express.User | null;
	name?: string;
	users?: Express.User[];
	messages?: GroupMessageFormat[];
	picture: string;
	bio: string;
}

export interface MessageFormat {
	id: string;
	sender?: mongoose.Schema.Types.ObjectId;
	content: string;
	date: Date;
	seen: string;
	chatId: string;
}

export interface GroupMessageFormat {
	id: string;
	sender?: Express.User;
	content: string;
	date: Date;
	seen: string;
	chatId: string;
}

export interface ChatType {
	id: string;
	users: mongoose.Schema.Types.ObjectId[];
	messages: mongoose.Schema.Types.ObjectId[];
}

export interface GroupType {
	id: string;
	users: mongoose.Schema.Types.ObjectId[];
	messages: mongoose.Schema.Types.ObjectId[];
	owner: mongoose.Schema.Types.ObjectId;
	picture: string;
	name: string;
	bio: string;
}

export interface UserType {
	name?: string;
	email?: string;
	id?: string;
	bio?: string;
	username?: string;
	picture?: string;
}