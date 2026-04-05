import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ConsultationCTA() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/booking")}
			>
				<Text style={styles.text}>Book Free Consultation</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16 },
	button: {
		backgroundColor: "#007bff",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
	},
	text: { color: "#fff", fontWeight: "bold" },
});
