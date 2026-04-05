import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SearchBar() {
	const router = useRouter();

	return (
		<Pressable
			style={styles.container}
			onPress={() => router.push("/(tabs)/search")}
		>
			<View style={styles.fakeInput}>
				<Text style={styles.placeholder}>Search...</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: { paddingHorizontal: 16, marginBottom: 8 },
	fakeInput: {
		backgroundColor: "#f2f2f2",
		borderRadius: 8,
		padding: 10,
	},
	placeholder: { color: "#888" },
});
