// components/common/HorizontalTypeFilter.tsx
import { ScrollView, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SmallTitle } from "../../atoms/Typography";

export default function HorizontalTypeFilter() {
	const router = useRouter();

	const filters = [
		{ id: "buySell", label: "Buy/Sell", emoji: "🏠", route: "/(tabs)/search" },
		{
			id: "roomRent",
			label: "Room Rent",
			emoji: "🛏️",
			route: "/property/roomRent/roomRent",
		},
		{
			id: "ownerDirect",
			label: "Owner Direct",
			emoji: "🔓",
			route: "/property/ownerDirect/ownerDirect",
		},
		{
			id: "offPlan",
			label: "Off-Plan",
			emoji: "📐",
			route: "/property/offPlan/offPlan",
		},
		{
			id: "business",
			label: "Business",
			emoji: "💼",
			route: "/property/business/business",
		},
	];

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{filters.map((filter) => (
				<Pressable
					key={filter.id}
					onPress={() => router.push(filter.route as any)}
					style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
				>
					<SmallTitle style={styles.emoji}>{filter.emoji}</SmallTitle>
					<SmallTitle style={styles.label}>{filter.label}</SmallTitle>
				</Pressable>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 0,
	},
	contentContainer: {
		paddingHorizontal: 16,
		gap: 12,
	},
	item: {
		flexDirection: "row", // horizontal layout
		alignItems: "center",
		backgroundColor: "#E5E5E5", // gray background
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 30, // pill shape
		gap: 8,
	},
	itemPressed: {
		opacity: 0.7,
		backgroundColor: "#D1D1D1", // darker gray on press
	},
	emoji: {
		fontSize: 18,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
});
