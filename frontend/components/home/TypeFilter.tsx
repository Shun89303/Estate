import { ScrollView, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "@/styles/styles";
import { SmallTitle } from "../atoms/Typography";

export default function TypeFilter() {
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
					style={({ pressed }) => [
						styles.item,
						pressed && styles.itemPressed,
						globalStyles.shadows,
					]}
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
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 70,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	itemPressed: {
		opacity: 0.7,
		backgroundColor: "#f9f9f9",
	},
	emoji: {
		fontSize: 24,
		marginBottom: 6,
	},
	label: {
		textAlign: "center",
	},
});
