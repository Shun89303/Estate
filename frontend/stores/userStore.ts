import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
	coins: number;
	addCoins: (amount: number) => void;
	deductCoins: (amount: number) => boolean; // returns true if successful
	setCoins: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			coins: 20, // default starting coins

			addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

			// For temp clear coin
			// deductCoins: (amount) => {
			// 	const { coins } = get();
			// 	if (coins >= amount) {
			// 		set({ coins: 0 });
			// 		return true;
			// 	}
			// 	return false;
			// },
			deductCoins: (amount) => {
				const { coins } = get();
				if (coins >= amount) {
					set({ coins: coins - amount });
					return true;
				}
				return false;
			},

			setCoins: (amount) => set({ coins: amount }),
		}),
		{
			name: "@user-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
