import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SectionHeader({
	title,
	onPress,
}: {
	title: string;
	onPress: () => void;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
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
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	title: { fontWeight: "bold", fontSize: 16 },
	seeAll: { color: "#007bff" },
});
