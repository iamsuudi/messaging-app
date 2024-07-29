import mongoose from "mongoose";

export interface PersonalChatFormatted {
	id: string;
	receiver?: Express.User | null;
	messages?: MessageFormat[];
}

export interface MessageFormat {
	id: string;
	sender?: Express.User;
	content: string;
	date: Date;
	seen: string;
}

export interface ChatType {
	id: string;
	users: mongoose.Schema.Types.ObjectId[];
	messages: mongoose.Schema.Types.ObjectId[];
}
