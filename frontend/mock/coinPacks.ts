import { LucideIcon, Zap, Star, Crown } from "lucide-react-native";

export interface OneTimePack {
	title: string;
	subtitle: string;
	value: string;
	popular?: boolean;
}

export interface Subscription {
	title: string;
	subtitle: string;
	value: string;
	subValue: string;
	icon: LucideIcon;
	iconColor: string;
	vip?: boolean;
}

export const MOCK_ONE_TIME_PACKS: OneTimePack[] = [
	{ title: "10 Coins", subtitle: "฿9.9/coin", value: "฿99" },
	{ title: "30 Coins", subtitle: "฿8.3/coin", value: "฿249", popular: true },
	{ title: "50 Coins", subtitle: "฿7.9/coin", value: "฿399" },
	{ title: "100 Coins", subtitle: "฿6.9/coin", value: "฿699" },
	{ title: "200 Coins", subtitle: "฿5.9/coin", value: "฿1199" },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
	{
		title: "Basic",
		subtitle: "30 coins/month",
		value: "฿199/mo",
		subValue: "Save 20%",
		icon: Zap,
		iconColor: "#BF8F5B",
	},
	{
		title: "Pro",
		subtitle: "80 coins/month",
		value: "฿449/mo",
		subValue: "Save 35%",
		icon: Star,
		iconColor: "#F59E0B",
	},
	{
		title: "VIP",
		subtitle: "200 coins/month",
		value: "฿899/mo",
		subValue: "Save 50%",
		icon: Crown,
		iconColor: "#9D59EF",
		vip: true,
	},
];
