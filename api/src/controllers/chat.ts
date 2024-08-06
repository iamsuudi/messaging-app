import { Request, Response } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import { ContactType, PersonalChatFormatted } from "../types";
import chatsParser from "../utils/chatsParser";
import { io } from "../app";
import contactsParser from "../utils/contactsParser";

export const getMyContacts = async (req: Request, res: Response) => {
	const myId = req.user?.id as string;

	const chats = await Chat.find({ users: myId });

	const contacts: ContactType[] = [];

	for await (let chat of chats) {
		const parsedChat = await contactsParser(myId, chat.toJSON());

		contacts.push(parsedChat);
	}

	return res.status(200).json(contacts);
};

export const getIndividualChats = async (req: Request, res: Response) => {
	const myId = req.user?.id as string;

	const chats = await Chat.find({ users: myId });

	const formattedChats: PersonalChatFormatted[] = [];

	for await (let chat of chats) {
		const parsedChat = await chatsParser(myId, chat.toJSON());

		formattedChats.push(parsedChat);
	}

	return res.status(200).json(formattedChats);
};

export const getIndividualChat = async (
	req: Request<{ chatId: string }>,
	res: Response
) => {
	const myId = req.user?.id as string;

	const { chatId } = req.params;

	const rawChat = await Chat.findById(chatId);

	const parsedChat = rawChat
		? await chatsParser(myId, rawChat.toJSON(), false, true)
		: null;

	// inform the other chat member that all messages are now seen
	io.to(chatId).emit("messagesAreSeen");

	return res.status(200).json(parsedChat);
};

export const makeIndividualChat = async (
	req: Request<{ chatId: string }, {}, { message: string }>,
	res: Response
) => {
	const sender = req.user?.id;
	const { message: content } = req.body;
	const { chatId } = req.params;

	// create message
	const newMessage = await Message.create({
		sender,
		content,
		date: new Date(),
		chatId,
	});

	// attach it to the corresponding chat
	const chat = await Chat.findById(chatId);
	chat?.messages.push(newMessage._id);
	await chat?.save();

	// now send message to the users in the room
	io.to(chatId).emit("message", newMessage);

	// and to home page to refresh last message shown
	io.emit("lastMessage", newMessage);

	return res.status(200).json(newMessage);
};

export const deleteIndividualChat = async (req: Request, res: Response) => {};

export const createIndividualChat = async (
	req: Request<{}, {}, { otherPersonId: string }>,
	res: Response
) => {
	const { otherPersonId } = req.body;
	const myId = req.user?.id as string;

	if (myId !== otherPersonId) {
		const chat = await Chat.findOne({
			users: { $all: [otherPersonId, myId] },
		});

		if (!chat) {
			const newChat = await Chat.create({
				users: [otherPersonId, req.user?.id],
			});

			const parsedChat = await chatsParser(myId, newChat.toJSON());

			io.emit("newChat", await chatsParser(myId, newChat.toJSON(), true));

			return res.status(201).send(parsedChat);
		}

		const parsedChat = await chatsParser(myId, chat.toJSON());

		return res.status(200).send(parsedChat);
	}

	res.sendStatus(200);
};

export const deleteMessage = async (
	req: Request<{ chatId: string }, {}, { messageId: string }>,
	res: Response
) => {
	const { chatId } = req.params;
	const { messageId } = req.body;

	await Message.findByIdAndDelete(messageId);

	const chat = await Chat.findById(chatId);

	if (chat?.messages)
		chat.messages = chat.messages.filter(
			(msg) => msg.toString() !== messageId
		);

	await chat?.save();

	io.emit("chatMessageDeleted", messageId);

	res.status(204).json(chat);
};

export const seeMessage = async (
	req: Request<{ chatId: string }, {}, { messageId: string }>,
	res: Response
) => {
	const { chatId } = req.params;
	const { messageId } = req.body;

	// inform the other chat member that message is seen
	io.to(chatId).emit("AMessageSeen", messageId);

	await Message.findByIdAndUpdate(messageId, { seen: true });

	res.sendStatus(200);
};
