import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SectionHeader({
	title,
	subtitle,
	onPress,
}: {
	title: string;
	subtitle?: string;
	onPress: () => void;
}) {
	return (
		<View style={styles.container}>
			{/* LEFT: Title + Subtitle */}
			<View style={styles.left}>
				<Text style={styles.title}>{title}</Text>
				{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			</View>

			{/* RIGHT: See All */}
			<Pressable onPress={onPress}>
				<Text style={styles.seeAll}>See All</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 8,
	},

	left: {
		flex: 1,
	},

	title: {
		fontWeight: "600",
		fontSize: 16,
	},

	subtitle: {
		fontSize: 12,
		color: "#666",
		marginTop: 2,
	},

	seeAll: {
		color: "#007bff",
		fontSize: 12,
		fontWeight: "500",
	},
});
