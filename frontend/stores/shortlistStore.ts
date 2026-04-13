import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ShortlistItem {
	id: string | number;
	coverImage: string;
	title: string;
	location: string;
	monthlyProfit: number;
	price: number;
	// add any other fields you need
}

interface ShortlistState {
	shortlistedItems: ShortlistItem[];
	addToShortlist: (item: ShortlistItem) => void;
	removeFromShortlist: (id: string | number) => void;
	isShortlisted: (id: string | number) => boolean;
	toggleShortlist: (item: ShortlistItem) => void;
	clearShortlist: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
	persist(
		(set, get) => ({
			shortlistedItems: [],

			addToShortlist: (item) => {
				const { shortlistedItems } = get();
				if (shortlistedItems.some((i) => i.id === item.id)) return;
				set({ shortlistedItems: [...shortlistedItems, item] });
			},

			removeFromShortlist: (id) => {
				const { shortlistedItems } = get();
				set({ shortlistedItems: shortlistedItems.filter((i) => i.id !== id) });
			},

			isShortlisted: (id) => {
				return get().shortlistedItems.some((i) => i.id === id);
			},

			toggleShortlist: (item) => {
				const { isShortlisted, addToShortlist, removeFromShortlist } = get();
				if (isShortlisted(item.id)) {
					removeFromShortlist(item.id);
				} else {
					addToShortlist(item);
				}
			},

			clearShortlist: () => set({ shortlistedItems: [] }),
		}),
		{
			name: "@shortlist-storage", // unique name for storage
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
