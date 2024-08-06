import mongoose from "mongoose";
import { UserType } from "./models/user";

export interface ContactType {
	id: string;
	contact?: UserType | null;
}

export interface PersonalChatFormatted {
	id: string;
	receiver?: UserType | null;
	messages?: MessageFormat[];
}

export interface GroupChatFormatted {
	id: string;
	owner?: UserType | null;
	name?: string;
	users?: UserType[];
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
	sender?: UserType;
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
