import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ConsultationButtons() {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Consultation</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button, styles.reserveButton]}>
				<Text style={styles.buttonText}>Reserve • 10 coins</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#fff",
	},
	button: {
		flex: 1,
		backgroundColor: "#007bff",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginHorizontal: 4,
	},
	reserveButton: { backgroundColor: "#28a745" },
	buttonText: { color: "#fff", fontWeight: "bold" },
});
