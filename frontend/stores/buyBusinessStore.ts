import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BuyBusinessState {
	unlockedIds: string[];
	unlockBusiness: (id: string) => void;
	isUnlocked: (id: string) => boolean;
	clearUnlocked: () => void;
}

export const useBuyBusinessStore = create<BuyBusinessState>()(
	persist(
		(set, get) => ({
			unlockedIds: [],
			unlockBusiness: (id) =>
				set((state) => ({
					unlockedIds: state.unlockedIds.includes(id)
						? state.unlockedIds
						: [...state.unlockedIds, id],
				})),
			isUnlocked: (id) => get().unlockedIds.includes(id),
			clearUnlocked: () => set({ unlockedIds: [] }),
		}),
		{
			name: "@buy-business-unlocked",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
