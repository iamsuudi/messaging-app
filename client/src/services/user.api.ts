import { z } from "zod";
import axios from "axios";
import { formSchema } from "@/types";
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
