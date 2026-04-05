import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Header() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Home</Text>
			<Pressable onPress={() => router.push("/notifications")}>
				<Text>🔔</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	title: { fontSize: 18, fontWeight: "bold" },
});
