import Message from "../models/message";
import User from "../models/user";
import { ChatType, MessageFormat, PersonalChatFormatted } from "../types";

export default async function chatsParser(
	myId: string,
	chat: ChatType,
	reverse = false,
	read = false
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
		switch (read) {
			case true: {
				const detail = await Message.findById(messageid);
				const isNotMine =
					detail?.sender?.toString() === receiverData?._id.toString();

				if (isNotMine && detail && !detail.seen) {
					detail.seen = true;
					await detail?.save();
				}
				if (detail) appendMessage(detail.toJSON());
				break;
			}
			default: {
				const detail = await Message.findById(messageid);
				if (detail) appendMessage(detail.toJSON());
				break;
			}
		}
	}

	return { id: chat?.id, receiver: receiverData?.toJSON(), messages };
}
