import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TransactionCategory =
	| "Top Up"
	| "Room Reserve"
	| "Property Reserve"
	| "Business Reserve"
	| "Unlock"
	| "Refund"
	| "Spent";

export interface Transaction {
	id: string;
	amount: number;
	type: "purchase" | "spent";
	category: TransactionCategory;
	date: string;
	note?: string;
}

interface CoinState {
	coins: number;
	history: Transaction[];
	loadUserData: (uid: string) => Promise<void>;
	addCoins: (
		uid: string,
		amount: number,
		category: TransactionCategory,
		note?: string,
	) => Promise<void>;
	deductCoins: (
		uid: string,
		amount: number,
		category: TransactionCategory,
		note?: string,
	) => Promise<boolean>;
	clearUserData: () => void;
}

const getCoinKey = (uid: string) => `@user_coins_${uid}`;
const getHistoryKey = (uid: string) => `@user_history_${uid}`;

export const useCoinStore = create<CoinState>((set, get) => ({
	coins: 0,
	history: [],

	loadUserData: async (uid: string) => {
		try {
			const coinsStr = await AsyncStorage.getItem(getCoinKey(uid));
			const historyStr = await AsyncStorage.getItem(getHistoryKey(uid));
			set({
				coins: coinsStr ? parseInt(coinsStr, 10) : 0,
				history: historyStr ? JSON.parse(historyStr) : [],
			});
		} catch (error) {
			console.error("Failed to load user data", error);
			set({ coins: 0, history: [] });
		}
	},

	addCoins: async (
		uid: string,
		amount: number,
		category: TransactionCategory,
		note?: string,
	) => {
		const { coins, history } = get();
		const newCoins = coins + amount;
		const newTransaction: Transaction = {
			id: Date.now().toString(),
			amount,
			type: "purchase",
			category,
			date: new Date().toISOString(),
			note: note || `Purchased ${amount} coins`,
		};
		const newHistory = [newTransaction, ...history];
		set({ coins: newCoins, history: newHistory });
		await AsyncStorage.setItem(getCoinKey(uid), newCoins.toString());
		await AsyncStorage.setItem(getHistoryKey(uid), JSON.stringify(newHistory));
	},

	deductCoins: async (
		uid: string,
		amount: number,
		category: TransactionCategory,
		note?: string,
	) => {
		const { coins, history } = get();
		if (coins < amount) return false;
		const newCoins = coins - amount;
		const newTransaction: Transaction = {
			id: Date.now().toString(),
			amount: -amount,
			type: "spent",
			category,
			date: new Date().toISOString(),
			note: note || `Spent ${amount} coins`,
		};
		const newHistory = [newTransaction, ...history];
		set({ coins: newCoins, history: newHistory });
		await AsyncStorage.setItem(getCoinKey(uid), newCoins.toString());
		await AsyncStorage.setItem(getHistoryKey(uid), JSON.stringify(newHistory));
		return true;
	},

	clearUserData: () => {
		set({ coins: 0, history: [] });
	},
}));
