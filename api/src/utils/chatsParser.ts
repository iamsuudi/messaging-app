import Message from "../models/message";
import User from "../models/user";
import { ChatType, MessageFormat, PersonalChatFormatted } from "../types";

export default async function chatsParser(
	myId: string,
	chat: ChatType,
	reverse = false
): Promise<PersonalChatFormatted> {
	const receiverId = chat.users.find((chatter) =>
		reverse ? chatter.toString() === myId : chatter.toString() !== myId
	);

	const receiverData = await User.findById(receiverId);

	const messages: MessageFormat[] = [];

	for await (let messageid of chat?.messages) {
		const detail = await Message.findById(messageid);
		if (detail) messages.push(detail.toJSON());
	}

	return { id: chat?.id, receiver: receiverData?.toJSON(), messages };
}
