import { create } from "zustand";
import { getMe } from "./services/user.api";
import { UserType } from "./types";

type UserStoreType = {
	user: UserType | null;
	setUser: (newUser: UserType) => void;
	fetchUser: () => Promise<UserType>;
	removeUser: () => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	fetchUser: async () => {
		const user = await getMe();
		set({ user });
		return user;
	},
	removeUser: () => set({ user: null }),
}));

type ErrorStoreType = {
	error: string | null;
	setError: (error: string) => void;
	removeError: () => void;
};

export const userErrorStore = create<ErrorStoreType>((set) => ({
	error: null,
	setError: (error) => set({ error }),
	removeError: () => set({ error: null }),
}));
