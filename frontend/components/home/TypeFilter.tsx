import { ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function TypeFilter() {
	const router = useRouter();

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
		>
			<Pressable onPress={() => router.push("/(tabs)/search")}>
				<Text style={styles.item}>Buy/Sell</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/roomRent/roomRent")}>
				<Text style={styles.item}>Room Rent</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/ownerDirect/ownerDirect")}>
				<Text style={styles.item}>Owner Direct</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/offPlan/offPlan")}>
				<Text style={styles.item}>Off-Plan</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/business")}>
				<Text style={styles.item}>Business</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { paddingHorizontal: 16, marginBottom: 8 },
	item: {
		backgroundColor: "#eee",
		padding: 8,
		borderRadius: 6,
		marginRight: 8,
	},
});
