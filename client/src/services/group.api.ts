import axios from "axios";
import { GroupMessageType, GroupType, UserType } from "@/types";
axios.defaults.withCredentials = true;

import { baseURL } from "../utils/config";

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
	users: string[]
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

export const updateGroup = async (
	groupId: string,
	name: string,
	bio: string
): Promise<GroupType> => {
	const response = await axios({
		method: "put",
		baseURL,
		url: `/chat/group/${groupId}`,
		data: { name, bio },
	});
	return response.data;
};

export const removeGroupMember = async (
	groupId: string,
	userId: string
): Promise<GroupType> => {
	const response = await axios({
		method: "delete",
		baseURL,
		url: `/chat/group/${groupId}/user`,
		data: { userId },
	});
	return response.data;
};

export const addGroupMember = async (
	groupId: string,
	userId: string
): Promise<UserType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: `/chat/group/${groupId}/user`,
		data: { userId },
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
