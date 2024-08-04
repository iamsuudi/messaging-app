import Message from "../models/message";
import User from "../models/user";
import {
	GroupChatFormatted,
	GroupMessageFormat,
	GroupType,
	MessageFormat,
} from "../types";

export async function groupParser(
	group: GroupType
): Promise<GroupChatFormatted> {
	const { id, picture, name, bio } = group;

	const owner = await User.findById(group.owner);

	const messages: GroupMessageFormat[] = [];

	for await (let messageid of group.messages) {
		const detail = await Message.findById(messageid);
		if (detail) {
			const parsed = await messageParser(detail.toJSON());
			if (detail) messages.push(parsed);
		}
	}

	const users: Express.User[] = [];

	for await (let userid of group.users) {
		const detail = await User.findById(userid);
		if (detail) users.push(detail.toJSON());
	}

	return {
		id,
		picture,
		name,
		owner: owner?.toJSON(),
		messages,
		users,
		bio
	};
}

export async function messageParser(
	message: MessageFormat
): Promise<GroupMessageFormat> {
	const { sender } = message;

	const senderData = await User.findById(sender);

	return { ...message, sender: senderData?.toJSON() };
}
