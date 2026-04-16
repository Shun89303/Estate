import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
	addSaved: (item: SavedItem) => void;
	removeSaved: (uniqueCode: string) => void;
	isSaved: (uniqueCode: string) => boolean;
	clearAll: () => void;
}

export const useSavedPropertiesStore = create<SavedPropertiesState>()(
	persist(
		(set, get) => ({
			items: [],
			addSaved: (item) => {
				const { items } = get();
				if (!items.some((i) => i.uniqueCode === item.uniqueCode)) {
					set({ items: [...items, item] });
				}
			},
			removeSaved: (uniqueCode) => {
				set({ items: get().items.filter((i) => i.uniqueCode !== uniqueCode) });
			},
			isSaved: (uniqueCode) =>
				get().items.some((i) => i.uniqueCode === uniqueCode),
			clearAll: () => set({ items: [] }),
		}),
		{
			name: "@saved-properties",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
