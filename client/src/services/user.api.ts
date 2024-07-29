import { z } from "zod";
import axios from "axios";
import { signinFormSchema, signupFormSchema, UserType } from "@/types";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

export const signin = async (data: z.infer<typeof signinFormSchema>) => {
	const response = await axios({
		method: "post",
		baseURL,
		url: "/auth/login",
		data,
	});
	return response.data;
};

export const signup = async (data: z.infer<typeof signupFormSchema>) => {
	const response = await axios({
		method: "post",
		baseURL,
		url: "/auth/register",
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

export const searchUsers = async (query: string): Promise<UserType[]> => {
	const response = await axios({
		method: "get",
		baseURL,
		url: `/searchUsers/${query}`,
	});
	return response.data;
};
