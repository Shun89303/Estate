import { useRouter } from "expo-router";
import {
	Pressable,
	Text,
	View,
	StyleSheet,
	FlatList,
	ScrollView,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock history data
const MOCK_HISTORY = [
	{
		id: "1",
		icon: "arrow-upward",
		title: "Top Up via Wallet",
		date: "2026-04-01",
		type: "Top Up",
		value: "+50",
	},
	{
		id: "2",
		icon: "arrow-downward",
		title: "Room Reservation",
		date: "2026-04-02",
		type: "Room Reserve",
		value: "-20",
	},
	{
		id: "3",
		icon: "arrow-upward",
		title: "Bought Coins",
		date: "2026-04-03",
		type: "Top Up",
		value: "+30",
	},
	{
		id: "4",
		icon: "arrow-downward",
		title: "Property Reservation",
		date: "2026-04-04",
		type: "Property Reserve",
		value: "-15",
	},
	{
		id: "5",
		icon: "arrow-downward",
		title: "Business Reserve",
		date: "2026-04-05",
		type: "Business Reserve",
		value: "-10",
	},
];

export default function CoinHistory() {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState<
		| "All"
		| "Top Up"
		| "Room Reserve"
		| "Property Reserve"
		| "Business Reserve"
		| "Unlock"
		| "Refund"
	>("All");

	const filteredHistory =
		activeFilter === "All"
			? MOCK_HISTORY
			: MOCK_HISTORY.filter((h) => h.type === activeFilter);

	const mainBoxes = [
		{
			icon: "arrow-upward",
			value: "+30",
			title: "Earned / Bought",
			color: "#4caf50",
		},
		{
			icon: "arrow-downward",
			value: "-10",
			title: "Spent",
			color: "#f44336",
		},
		{
			icon: "attach-money",
			value: "20",
			title: "Balance",
			color: "#ff9800",
		},
	];

	const filters = [
		"All",
		"Top Up",
		"Room Reserve",
		"Property Reserve",
		"Business Reserve",
		"Unlock",
		"Refund",
	];

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			{/* Title */}
			<Text style={styles.title}>Coin History</Text>

			{/* Boxes */}
			<View style={styles.boxRow}>
				{mainBoxes.map((box) => (
					<View key={box.title} style={styles.box}>
						<MaterialIcons name={box.icon as any} size={24} color={box.color} />
						<Text style={styles.boxValue}>{box.value}</Text>
						<Text style={styles.boxTitle}>{box.title}</Text>
					</View>
				))}
			</View>

			{/* Horizontally Scrollable Filters */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.scrollFilters}
				contentContainerStyle={{ paddingHorizontal: 4 }}
			>
				{filters.map((f) => (
					<Pressable
						key={f}
						style={[
							styles.filterChip,
							activeFilter === f && styles.filterChipActive,
						]}
						onPress={() => setActiveFilter(f as any)}
					>
						<Text
							style={[
								styles.filterText,
								activeFilter === f && styles.filterTextActive,
							]}
						>
							{f}
						</Text>
					</Pressable>
				))}
			</ScrollView>

			{/* History List */}
			<FlatList
				data={filteredHistory}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<MaterialIcons
							name={item.icon as any}
							size={24}
							color={item.icon === "arrow-upward" ? "#4caf50" : "#f44336"}
							style={{ marginRight: 12 }}
						/>
						<View style={styles.cardInfo}>
							<Text style={styles.cardTitle}>{item.title}</Text>
							<View style={styles.cardMetaRow}>
								<Text style={styles.cardDate}>{item.date}</Text>
								<Text style={styles.cardType}>{item.type}</Text>
							</View>
						</View>
						<Text style={styles.cardValue}>{item.value}</Text>
					</View>
				)}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: 16,
	},

	back: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 12,
	},

	title: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 16,
	},

	boxRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},

	box: {
		width: "30%",
		backgroundColor: "#f5f5f5",
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 12,
	},

	boxValue: {
		fontSize: 16,
		fontWeight: "700",
		marginVertical: 4,
	},

	boxTitle: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
	},

	scrollFilters: {
		marginBottom: 16,
	},

	filterChip: {
		paddingHorizontal: 12, // keep some horizontal padding
		paddingVertical: 4, // reduce vertical padding for shorter pills
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 8,
	},

	filterChipActive: {
		backgroundColor: "#000",
		borderColor: "#000",
	},

	filterText: {
		fontSize: 10, // smaller font
		color: "#333",
		fontWeight: "500",
	},

	filterTextActive: {
		color: "#fff",
	},

	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 12,
		marginBottom: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 2,
	},

	cardInfo: {
		flex: 1,
	},

	cardTitle: {
		fontSize: 14,
		fontWeight: "600",
	},

	cardMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 2,
	},

	cardDate: {
		fontSize: 11,
		color: "#666",
	},

	cardType: {
		fontSize: 11,
		color: "#888",
	},

	cardValue: {
		fontSize: 14,
		fontWeight: "700",
	},
});
