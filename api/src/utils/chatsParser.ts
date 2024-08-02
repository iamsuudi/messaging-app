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

	for await (let messageid of chat?.messages) {
		switch (read) {
			case true: {
				let detail = await Message.findById(messageid);

				if (
					detail?.sender?.toString() === receiverData?._id.toString()
				) {
					detail = await Message.findByIdAndUpdate(
						messageid,
						{ seen: true },
						{ new: true }
					);
				}
				if (detail) messages.push(detail.toJSON());
				break;
			}
			default: {
				const detail = await Message.findById(messageid);
				if (detail) messages.push(detail.toJSON());
				break;
			}
		}
	}

	return { id: chat?.id, receiver: receiverData?.toJSON(), messages };
}
