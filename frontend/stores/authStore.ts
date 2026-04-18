import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCoinStore } from "./coinStore";

const secureStorage = {
	getItem: async (key: string) => await SecureStore.getItemAsync(key),
	setItem: async (key: string, value: string) =>
		await SecureStore.setItemAsync(key, value),
	removeItem: async (key: string) => await SecureStore.deleteItemAsync(key),
};

export type UserRole = "user" | "owner" | "agent";

export interface User {
	uid: string;
	phone: string;
	role: UserRole;
	name?: string;
	email?: string;
	profileImage?: string;
}

interface AuthState {
	user: User | null;
	isGuest: boolean;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (phone: string, password: string) => Promise<void>;
	register: (
		phone: string,
		password: string,
		name?: string,
		email?: string,
	) => Promise<void>;
	logout: () => Promise<void>;
	updateUser: (updates: Partial<User>) => void;
	setGuest: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getUidForPhone = async (phone: string): Promise<string | null> => {
	const mapping = await AsyncStorage.getItem(`@phone_uid_${phone}`);
	return mapping ? JSON.parse(mapping).uid : null;
};
const setUidForPhone = async (phone: string, uid: string) => {
	await AsyncStorage.setItem(`@phone_uid_${phone}`, JSON.stringify({ uid }));
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isGuest: false,
			isLoading: false,
			isAuthenticated: false,

			login: async (phone, password) => {
				set({ isLoading: true });
				try {
					await delay(1000);
					let uid = await getUidForPhone(phone);
					if (!uid) {
						uid = Date.now().toString();
						await setUidForPhone(phone, uid);
					}
					// Get the current user from store (may be from previous session)
					const currentUser = get().user;
					let user: User;
					if (currentUser && currentUser.uid === uid) {
						// Reuse existing user data (preserve name, email, profileImage)
						user = { ...currentUser, phone }; // update phone if changed
					} else {
						// New user – create fresh
						user = {
							uid,
							phone,
							role: "user",
							name: "",
							email: "",
							profileImage: "",
						};
					}
					set({
						user,
						isAuthenticated: true,
						isGuest: false,
						isLoading: false,
					});
					// Load coin data using uid
					await useCoinStore.getState().loadUserData(uid);
				} catch (error) {
					set({ isLoading: false });
					throw error;
				}
			},

			register: async (phone, password, name, email) => {
				set({ isLoading: true });
				try {
					await delay(1000);
					const uid = Date.now().toString();
					await setUidForPhone(phone, uid);
					const user: User = {
						uid,
						phone,
						role: "user",
						name,
						email,
					};
					set({
						user,
						isAuthenticated: true,
						isGuest: false,
						isLoading: false,
					});
					await useCoinStore.getState().loadUserData(uid);
				} catch (error) {
					set({ isLoading: false });
					throw error;
				}
			},

			logout: async () => {
				set({ isLoading: true });
				await delay(500);
				set({
					// user: null,
					isAuthenticated: false,
					isGuest: false,
					isLoading: false,
				});
				useCoinStore.getState().clearUserData();
			},

			updateUser: (updates) => {
				const currentUser = get().user;
				if (currentUser) {
					set({ user: { ...currentUser, ...updates } });
				}
			},

			setGuest: () => {
				set({ isGuest: true, isAuthenticated: false, user: null });
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => secureStorage),
		},
	),
);
