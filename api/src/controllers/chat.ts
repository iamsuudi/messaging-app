import { Request, Response } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import { PersonalChatFormatted } from "../types";
import chatsParser from "../utils/chatsParser";

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
	const { chatId } = req.params;

	const chat = await Chat.findById(chatId);

	return res.status(200).json(chat);
};

export const makeIndividualChat = async (
	req: Request<{ chatId: string }, {}, { message: string }>,
	res: Response
) => {
	const sender = req.user?.id;
	const { message: content } = req.body;
	const { chatId } = req.params;
	const newMessage = await Message.create({
		sender,
		content,
		date: new Date(),
	});

	const chat = await Chat.findById(chatId);
	chat?.messages.push(newMessage._id);
	await chat?.save();

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

			// const {io} = req;
			// io.on('connection', {
			// 	console.log('a user joined');
				
			// })

			return res.status(201).send(newChat._id.toString());
		}

		return res.status(200).send(chat._id.toString());
	}
};

export const deleteMessage = async (req: Request, res: Response) => {};
