import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PropertyCategory =
	| "buySell"
	| "roomRent"
	| "ownerDirect"
	| "offPlan"
	| "business"
	| "buyBusiness";

export interface SavedItem {
	uniqueCode: string;
	category: PropertyCategory;
	coverImage: string;
	title: string;
	location: string;
	priceDisplay: string;
	price: number;
}

interface SavedPropertiesState {
	items: SavedItem[];
	loadUserData: (uid: string) => Promise<void>;
	addSaved: (item: SavedItem, uid: string) => Promise<void>;
	removeSaved: (uniqueCode: string, uid: string) => Promise<void>;
	isSaved: (uniqueCode: string) => boolean;
	clearUserData: () => void;
}

const getStorageKey = (uid: string) => `@saved-properties_${uid}`;

export const useSavedPropertiesStore = create<SavedPropertiesState>(
	(set, get) => ({
		items: [],

		loadUserData: async (uid: string) => {
			try {
				const stored = await AsyncStorage.getItem(getStorageKey(uid));
				set({ items: stored ? JSON.parse(stored) : [] });
			} catch (error) {
				console.error("Failed to load saved properties", error);
				set({ items: [] });
			}
		},

		addSaved: async (item: SavedItem, uid: string) => {
			const { items } = get();
			if (items.some((i) => i.uniqueCode === item.uniqueCode)) return;
			const newItems = [...items, item];
			set({ items: newItems });
			await AsyncStorage.setItem(getStorageKey(uid), JSON.stringify(newItems));
		},

		removeSaved: async (uniqueCode: string, uid: string) => {
			const { items } = get();
			const newItems = items.filter((i) => i.uniqueCode !== uniqueCode);
			set({ items: newItems });
			await AsyncStorage.setItem(getStorageKey(uid), JSON.stringify(newItems));
		},

		isSaved: (uniqueCode: string) => {
			return get().items.some((i) => i.uniqueCode === uniqueCode);
		},

		clearUserData: () => {
			set({ items: [] });
		},
	}),
);
