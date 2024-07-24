import { z } from "zod";
import axios from "axios";
import { formSchema, UserType } from "@/types";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

export const signin = async (data: z.infer<typeof formSchema>) => {
	const response = await axios({
		method: "post",
		baseURL,
		url: "/auth/login",
		data,
	});
	return response.data;
};

export const logout = async () => {
	const response = await axios({
		method: "post",
		baseURL,
		url: "/auth/logout",
	});
	return response.data;
};

export const getMe = async (): Promise<UserType> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: "/me",
	});
	return response.data;
};

export const updateProfile = async (data: UserType): Promise<UserType> => {
	const response = await axios({
		method: "post",
		baseURL,
		url: "/updateMe",
		data,
	});
	return response.data;
};
