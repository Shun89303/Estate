import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ActionButtons() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={() => router.back()}>
				<Ionicons name="arrow-back" size={24} color="#000" />
			</TouchableOpacity>

			<View style={styles.rightButtons}>
				<TouchableOpacity style={styles.button}>
					<Ionicons name="heart-outline" size={24} color="#000" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Ionicons name="share-social-outline" size={24} color="#000" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	button: {
		padding: 8,
	},
	rightButtons: {
		flexDirection: "row",
	},
});
