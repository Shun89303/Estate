export type HistoryType =
	| "Top Up"
	| "Room Reserve"
	| "Property Reserve"
	| "Business Reserve"
	| "Unlock"
	| "Refund";

export interface CoinHistoryItem {
	id: string;
	title: string;
	date: string;
	type: HistoryType;
	value: string; // e.g., "+50" or "-20"
}

export const MOCK_COIN_HISTORY: CoinHistoryItem[] = [
	{
		id: "1",
		title: "Top Up via Wallet",
		date: "2026-04-01",
		type: "Top Up",
		value: "+50",
	},
	{
		id: "2",
		title: "Room Reservation",
		date: "2026-04-02",
		type: "Room Reserve",
		value: "-20",
	},
	{
		id: "3",
		title: "Bought Coins",
		date: "2026-04-03",
		type: "Top Up",
		value: "+30",
	},
	{
		id: "4",
		title: "Property Reservation",
		date: "2026-04-04",
		type: "Property Reserve",
		value: "-15",
	},
	{
		id: "5",
		title: "Business Reserve",
		date: "2026-04-05",
		type: "Business Reserve",
		value: "-10",
	},
];
