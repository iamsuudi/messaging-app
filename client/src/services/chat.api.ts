import axios from "axios";
import { ChatType } from "@/types";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

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
