import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";

export default function TopUpCoins() {
	const [selectedTab, setSelectedTab] = useState<"oneTime" | "subscriptions">(
		"oneTime",
	);

	const oneTimePacks = [
		{ title: "10 Coins", subtitle: "฿9.9/coin", value: "฿99" },
		{
			title: "30 Coins",
			subtitle: "฿8.3/coin",
			value: "฿249",
			popular: true,
		},
		{ title: "50 Coins", subtitle: "฿7.9/coin", value: "฿399" },
		{ title: "100 Coins", subtitle: "฿6.9/coin", value: "฿699" },
		{ title: "200 Coins", subtitle: "฿5.9/coin", value: "฿1199" },
	];

	const subscriptions = [
		{
			title: "Basic",
			subtitle: "30 coins/month",
			value: "฿199/mo",
			subValue: "Save 20%",
		},
		{
			title: "Pro",
			subtitle: "80 coins/month",
			value: "฿449/mo",
			subValue: "Save 35%",
		},
		{
			title: "VIP",
			subtitle: "200 coins/month",
			value: "฿899/mo",
			subValue: "Save 50%",
			vip: true,
		},
	];

	const renderOneTimeCard = (item: any) => (
		<TouchableOpacity
			key={item.title}
			style={[styles.card, item.popular && styles.popularCard]}
		>
			<Text style={{ marginRight: 12 }}>🪙</Text>
			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 2,
					}}
				>
					<Text style={{ fontWeight: "600", fontSize: 14 }}>{item.title}</Text>
					{item.popular && (
						<View style={styles.popularBadge}>
							<Text style={{ color: "#fff", fontSize: 10 }}>POPULAR</Text>
						</View>
					)}
				</View>
				<Text style={{ color: "#666", fontSize: 12 }}>{item.subtitle}</Text>
			</View>
			<Text style={{ fontWeight: "600" }}>{item.value}</Text>
		</TouchableOpacity>
	);

	const renderSubscriptionCard = (item: any) => (
		<TouchableOpacity
			key={item.title}
			style={[styles.card, item.vip && styles.vipCard]}
		>
			<Text style={{ marginRight: 12 }}>🪙</Text>
			<View style={{ flex: 1 }}>
				<Text style={{ fontWeight: "600", fontSize: 14 }}>{item.title}</Text>
				<Text style={{ color: "#666", fontSize: 12 }}>{item.subtitle}</Text>
			</View>
			<View style={{ alignItems: "flex-end" }}>
				<Text style={{ fontWeight: "600" }}>{item.value}</Text>
				{item.subValue && (
					<Text style={{ color: "#666", fontSize: 12 }}>{item.subValue}</Text>
				)}
			</View>
		</TouchableOpacity>
	);

	return (
		<ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
			{/* Header */}
			<Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
				Buy Coins
			</Text>
			<Text style={{ color: "#666", fontSize: 12, marginBottom: 16 }}>
				Current balance: 20 coins
			</Text>

			{/* Toggle */}
			<View style={{ flexDirection: "row", marginBottom: 16 }}>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						selectedTab === "oneTime" && styles.toggleButtonActive,
					]}
					onPress={() => setSelectedTab("oneTime")}
				>
					<Text
						style={[
							styles.toggleText,
							selectedTab === "oneTime" && styles.toggleTextActive,
						]}
					>
						One-time Packs
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						selectedTab === "subscriptions" && styles.toggleButtonActive,
					]}
					onPress={() => setSelectedTab("subscriptions")}
				>
					<Text
						style={[
							styles.toggleText,
							selectedTab === "subscriptions" && styles.toggleTextActive,
						]}
					>
						Subscriptions
					</Text>
				</TouchableOpacity>
			</View>

			{/* Cards */}
			{selectedTab === "oneTime"
				? oneTimePacks.map((item) => renderOneTimeCard(item))
				: subscriptions.map((item) => renderSubscriptionCard(item))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	toggleButton: {
		flex: 1,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		alignItems: "center",
		marginRight: 8,
	},
	toggleButtonActive: {
		backgroundColor: "#000",
		borderColor: "#000",
	},
	toggleText: {
		color: "#333",
		fontSize: 12,
		fontWeight: "500",
	},
	toggleTextActive: {
		color: "#fff",
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#eee",
		marginBottom: 10,
		backgroundColor: "#fff",
	},
	popularCard: {
		borderColor: "#f59e0b",
		backgroundColor: "#fffbeb",
	},
	popularBadge: {
		backgroundColor: "#f59e0b",
		borderRadius: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
		marginLeft: 8,
	},
	vipCard: {
		backgroundColor: "#f3e8ff",
		borderColor: "#9f7aea",
	},
});
