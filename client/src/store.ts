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
