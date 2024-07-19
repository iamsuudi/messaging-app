import axios from "axios";
axios.defaults.withCredentials = true;

import { Crendentials } from "@/types";

const baseURL = "http://localhost:3001/api";

export const signin = async (data: Crendentials) => {
	const response = await axios({
		method: "post",
		baseURL,
		url: "/auth/login",
		data,
	});
	return response.data;
};
