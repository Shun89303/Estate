import { FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "@/styles/styles";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import Title from "../typography/Title";

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
		{
			id: "buyBusiness",
			label: "Buy Business",
			emoji: "🏪",
			route: "/property/buyBusiness/buyBusiness",
		},
	];

	const renderItem = ({ item }: { item: (typeof filters)[0] }) => (
		<Pressable
			onPress={() => router.push(item.route as any)}
			style={({ pressed }) => [
				styles.item,
				pressed && styles.itemPressed,
				globalStyles.shadows,
			]}
		>
			<Title variant="page" style={styles.emoji}>
				{item.emoji}
			</Title>
			<Title variant="small" style={styles.label}>
				{item.label}
			</Title>
		</Pressable>
	);

	return (
		<FlatList
			data={filters}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			numColumns={3}
			scrollEnabled={false}
			contentContainerStyle={styles.container}
			columnWrapperStyle={styles.row}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},
	row: {
		justifyContent: "space-between",
		marginBottom: spacing.sm,
	},
	item: {
		flex: 1,
		aspectRatio: 1,
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		alignItems: "center",
		justifyContent: "center",
		padding: spacing.sm,
		marginHorizontal: spacing.xs,
		...globalStyles.shadows,
	},
	itemPressed: {
		opacity: 0.7,
		backgroundColor: "#f9f9f9",
	},
	emoji: {
		marginBottom: spacing.sm,
	},
	label: {
		textAlign: "center",
	},
});
