import axios from "axios";
import { GroupMessageType, GroupType } from "@/types";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

export const getGroupChats = async (): Promise<GroupType[]> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: `/chat/group`,
	});
	return response.data;
};

export const getGroupChat = async (groupId: string): Promise<GroupType> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: `/chat/group/${groupId}`,
	});
	return response.data;
};

export const makeGroupChat = async (
	groupId: string,
	content: string
): Promise<GroupMessageType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/group/${groupId}`,
		data: { content },
	});
	return response.data;
};

export const createGroup = async (
	name: string,
	users: string[],
): Promise<GroupType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/group`,
		data: {
			name,
			users,
		},
	});
	return response.data;
};

export const updateGroupProfilePic = async (
	groupId: string,
	data: FormData
): Promise<GroupType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/group/${groupId}/updateProfilePic`,
		data,
	});
	return response.data;
};

export const sendGroupMessage = async (
	groupId: string,
	content: string
): Promise<GroupMessageType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/group/${groupId}`,
		data: {
			content,
		},
	});
	return response.data;
};