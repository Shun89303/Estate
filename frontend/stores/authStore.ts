import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

// Custom storage adapter for SecureStore
const secureStorage = {
	getItem: async (key: string) => {
		return await SecureStore.getItemAsync(key);
	},
	setItem: async (key: string, value: string) => {
		await SecureStore.setItemAsync(key, value);
	},
	removeItem: async (key: string) => {
		await SecureStore.deleteItemAsync(key);
	},
};

export type UserRole = "user" | "owner" | "agent";

export interface User {
	id: string;
	phone: string;
	role: UserRole;
	name?: string; // optional for buyers, required for agents/owners
}

interface AuthState {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (phone: string, password: string) => Promise<void>;
	register: (phone: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	updateUser: (updates: Partial<User>) => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isLoading: false,
			isAuthenticated: false,

			login: async (phone, password) => {
				set({ isLoading: true });
				try {
					await delay(1000);
					if (!phone || !password)
						throw new Error("Phone and password required");

					// Mock user
					const user: User = {
						id: "1",
						phone,
						role: "user",
					};
					set({ user, isAuthenticated: true, isLoading: false });
				} catch (error) {
					set({ isLoading: false });
					throw error;
				}
			},

			register: async (phone, password) => {
				set({ isLoading: true });
				try {
					await delay(1000);
					if (!phone || !password) throw new Error("All fields required");

					const user: User = {
						id: Date.now().toString(),
						phone,
						role: "user",
					};
					set({ user, isAuthenticated: true, isLoading: false });
				} catch (error) {
					set({ isLoading: false });
					throw error;
				}
			},

			logout: async () => {
				set({ isLoading: true });
				await delay(500);
				set({ user: null, isAuthenticated: false, isLoading: false });
			},

			updateUser: (updates) => {
				const currentUser = get().user;
				if (currentUser) {
					set({ user: { ...currentUser, ...updates } });
				}
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => secureStorage),
		},
	),
);
