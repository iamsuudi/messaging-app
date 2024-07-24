import { z } from "zod";

export const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export interface UserType {
	id: string;
	email: string;
	username?: string;
	bio?: string;
	name?: string;
}

export const profileSchema = z.object({
	email: z.string().email(),
	username: z.string().optional(),
	bio: z.string().optional(),
	name: z.string().optional(),
});
