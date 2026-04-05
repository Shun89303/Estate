import { ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function PurposeFilter() {
	const router = useRouter();

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
		>
			<Pressable onPress={() => router.push("/(tabs)/search")}>
				<Text style={styles.item}>For Investment</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/(tabs)/search")}>
				<Text style={styles.item}>For Living</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/(tabs)/search")}>
				<Text style={styles.item}>For Rent</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/(tabs)/search")}>
				<Text style={styles.item}>For Long Stay Visa</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { paddingHorizontal: 16, marginBottom: 16 },
	item: {
		backgroundColor: "#eee",
		padding: 8,
		borderRadius: 6,
		marginRight: 8,
	},
});
