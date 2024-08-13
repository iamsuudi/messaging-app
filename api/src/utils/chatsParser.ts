import Message from "../models/message";
import User from "../models/user";
import {
	ChatsFormatted,
	ChatType,
	MessageFormat,
	PersonalChatFormatted,
} from "../types";

export default async function chatsParser(
	myId: string,
	chat: ChatType,
	reverse = false
): Promise<ChatsFormatted> {
	const receiverId = chat.users.find((chatter) =>
		reverse ? chatter.toString() === myId : chatter.toString() !== myId
	);

	const receiverData = await User.findById(receiverId);

	let unSeen = 0;

	for await (let messageid of chat?.messages) {
		const detail = await Message.findById(messageid);
		const isNotMine =
			detail?.sender?.toString() === receiverData?._id.toString();

		if (isNotMine && detail && !detail.seen) {
			unSeen += 1;
		}
	}

	const lastMessage = chat?.messages
		? await Message.findById(chat.messages.pop())
		: null;

	return {
		id: chat?.id,
		unSeen,
		receiver: receiverData?.toJSON(),
		lastMessage: lastMessage?.toJSON(),
	};
}

export async function chatParser(
	myId: string,
	chat: ChatType,
	reverse = false
): Promise<PersonalChatFormatted> {
	const receiverId = chat.users.find((chatter) =>
		reverse ? chatter.toString() === myId : chatter.toString() !== myId
	);

	const receiverData = await User.findById(receiverId);

	const messages: MessageFormat[] = [];

	function appendMessage(message: MessageFormat) {
		for (let i = 0; i < messages.length; i += 1) {
			if (new Date(messages[i].date) > new Date(message.date)) {
				messages.splice(i, 0, message);
				return i;
			}
		}
		messages.push(message);
	}

	for await (let messageid of chat?.messages) {
		const detail = await Message.findById(messageid);
		const isNotMine =
			detail?.sender?.toString() === receiverData?._id.toString();

		if (isNotMine && detail && !detail.seen) {
			detail.seen = true;
			await detail?.save();
		}
		if (detail) appendMessage(detail.toJSON());
	}

	return { id: chat?.id, receiver: receiverData?.toJSON(), messages };
}
