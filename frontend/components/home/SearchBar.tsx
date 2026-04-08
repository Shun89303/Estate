import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";
import { Search } from "lucide-react-native";
import { BodyText } from "../atoms/Typography";
import globalStyles from "@/styles/styles";

export default function SearchBar() {
	const router = useRouter();

	return (
		<Pressable
			style={styles.container}
			onPress={() => router.push("/(tabs)/search")}
		>
			<View style={[styles.fakeInput, globalStyles.shadows]}>
				<Search size={18} color="#888" />
				<BodyText style={styles.placeholder}>
					Search by location or name...
				</BodyText>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	fakeInput: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 16,
		gap: 8,
	},
	placeholder: {
		color: "#888",
		flex: 1,
	},
});
