import axios from "axios";
import { ChatType, ContactType, MessageType } from "@/types";
axios.defaults.withCredentials = true;
import { baseURL } from "../utils/config";

export const getMyContacts = async (): Promise<ContactType[]> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: `/contacts`,
	});
	return response.data;
};

export const getPersonalChats = async (): Promise<ChatType[]> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: `/chat/individual`,
	});
	return response.data;
};

export const getPersonalChat = async (chatId: string): Promise<ChatType> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: `/chat/individual/${chatId}`,
	});
	return response.data;
};

export const startPersonalChatWithSomeone = async (
	otherPersonId: string
): Promise<string> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/individual`,
		data: {
			otherPersonId,
		},
	});
	return response.data.id;
};

export const sendMessage = async (
	chatId: string,
	message: string
): Promise<MessageType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/individual/${chatId}`,
		data: {
			message,
		},
	});
	return response.data;
};

export const deleteMessage = async (
	chatId: string,
	messageId: string
): Promise<MessageType> => {
	const response = await axios({
		method: "delete",
		baseURL,
		url: `/chat/individual/${chatId}/message`,
		data: {
			messageId,
		},
	});
	return response.data;
};

export const seeMessage = async (
	chatId: string,
	messageId: string
): Promise<MessageType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/individual/${chatId}/see`,
		data: {
			messageId,
		},
	});
	return response.data;
};

export const unSeenMessage = async (
	chatId: string,
	sender: string
): Promise<MessageType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/individual/${chatId}/unseen`,
		data: {
			sender,
		},
	});
	return response.data;
};

export const deleteChat = async (chatId: string): Promise<ChatType> => {
	const response = await axios({
		method: "delete",
		baseURL,
		url: `/chat/individual/${chatId}`,
	});
	return response.data;
};

export const clearChat = async (chatId: string): Promise<ChatType> => {
	const response = await axios({
		method: "delete",
		baseURL,
		url: `/chat/individual/${chatId}/clear`,
	});
	return response.data;
};
