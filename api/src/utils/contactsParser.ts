import User from "../models/user";
import { ChatType, ContactType } from "../types";

export default async function contactsParser(
	myId: string,
	chat: ChatType,
	reverse = false,
	read = false
): Promise<ContactType> {
	const receiverId = chat.users.find((chatter) =>
		reverse ? chatter.toString() === myId : chatter.toString() !== myId
	);

	const receiverData = await User.findById(receiverId);

	return { id: chat?.id, contact: receiverData?.toJSON() };
}
