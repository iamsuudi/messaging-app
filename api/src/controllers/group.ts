import { Request, Response } from "express";
import Group from "../models/group";
import { GroupChatFormatted } from "../types";
import { groupParser } from "../utils/groupParser";
import Message from "../models/message";
import { io } from "../app";

export const getGroupChats = async (req: Request, res: Response) => {
	const myId = req.user?.id as string;

	const groupChats = await Group.find({ users: myId });

	const formattedChats: GroupChatFormatted[] = [];

	for await (let chat of groupChats) {
		const parsedChat = await groupParser(chat.toJSON());

		formattedChats.push(parsedChat);
	}

	return res.status(200).json(formattedChats);
};

export const getGroupChat = async (
	req: Request<{ groupId: string }>,
	res: Response
) => {
	const { groupId } = req.params;
	const group = await Group.findById(groupId);

	const parsedGroup = group ? await groupParser(group?.toJSON()) : null;

	res.status(200).json(parsedGroup);
};

export const makeGroupChat = async (
	req: Request<{ groupId: string }, {}, { content: string }>,
	res: Response
) => {
	const sender = req.user?.id;
	const { groupId } = req.params;
	const { content } = req.body;

	const message = await Message.create({
		content,
		groupId,
		date: new Date(),
		sender,
		seen: true,
	});

	const group = await Group.findById(groupId);
	if (group?.messages) group.messages = group.messages.concat(message._id);
	await group?.save();

	// now send message to the users in the group
	io.to(groupId).emit("groupMessage", message);

	// and to home page to refresh last message shown
	io.emit("groupLastMessage", message);

	res.status(201).json(message);
};

export const editGroupChat = async (
	req: Request<{ groupId: string }, {}, { name: string; bio: string }>,
	res: Response
) => {
	const group = await Group.findByIdAndUpdate(
		req.params.groupId,
		{ ...req.body },
		{ new: true }
	);

	res.status(204).json(group);
};

export const deleteGroupChat = async (req: Request, res: Response) => {};

export const createGroupChat = async (
	req: Request<{}, {}, { name: string; users: string[] }>,
	res: Response
) => {
	const owner = req.user?.id;
	const { name, users } = req.body;

	const group = await Group.create({
		owner,
		name,
		users: [...users, owner],
	});

	const parsedGroup = group ? await groupParser(group?.toJSON()) : null;

	io.emit("newGroup", parsedGroup);

	return res.status(201).json(parsedGroup);
};

export const removeUser = async (
	req: Request<{ groupId: string }, {}, { userId: string }>,
	res: Response
) => {
	const group = await Group.findById(req.params.groupId);

	if (group?.users)
		group.users = group.users.filter(
			(user) => user._id.toString() !== req.body.userId
		);

	await group?.save();

	res.status(204).json(group);
};

export const deleteMessage = async (req: Request, res: Response) => {};
