import { z } from "zod";

export const signinFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const signupFormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirm: z.string(),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords must match",
		path: ["confirm"],
	});

export interface UserType {
	id: string;
	email: string;
	username?: string;
	bio?: string;
	name?: string;
	picture?: string;
}

export const profileSchema = z.object({
	email: z.string().email(),
	username: z.string().optional(),
	bio: z.string().optional(),
	name: z.string().optional(),
});

export interface ContactType {
	id: string;
	contact: UserType;
}

export interface ChatsType {
	id: string;
	receiver: UserType;
	lastMessage: MessageType;
	unSeen: number;
}

export interface ChatType {
	id: string;
	receiver: UserType;
	messages: MessageType[];
}

export interface GroupType {
	id: string;
	name: string;
	picture: string;
	bio: string;
	owner: UserType;
	users: UserType[];
	messages: GroupMessageType[];
}

export interface MessageType {
	id: string;
	sender: string;
	content: string;
	date: Date;
	seen: boolean;
	chatId: string;
}

export interface GroupMessageType {
	id: string;
	sender: UserType;
	content: string;
	date: Date;
	seen: boolean;
	chatId: string;
}
