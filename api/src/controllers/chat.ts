import { Request, Response } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import { PersonalChatFormatted } from "../types";
import chatsParser from "../utils/chatsParser";
import { io } from "../app";

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
		? await chatsParser(myId, rawChat.toJSON())
		: null;

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
	});

	// attach it to the corresponding chat
	const chat = await Chat.findById(chatId);
	chat?.messages.push(newMessage._id);
	await chat?.save();

	// now send message to the users in the room
	io.to(chatId).emit("message", newMessage);

	return res.status(200).json(newMessage);
};

export const deleteIndividualChat = async (req: Request, res: Response) => {};

export const createIndividualChat = async (
	req: Request<{}, {}, { otherPersonId: string }>,
	res: Response
) => {
	const { otherPersonId } = req.body;
	const myId = req.user?.id;

	if (myId !== otherPersonId) {
		const chat = await Chat.findOne({ users: [otherPersonId, myId] });

		if (!chat) {
			const newChat = await Chat.create({
				users: [otherPersonId, req.user?.id],
			});

			return res.status(201).send(newChat);
		}

		return res.status(200).send(chat);
	}

	res.sendStatus(200);
};

export const deleteMessage = async (req: Request, res: Response) => {};
