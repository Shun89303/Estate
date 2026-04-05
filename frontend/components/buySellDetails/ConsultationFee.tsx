import { View, Text, StyleSheet } from "react-native";
import { Property } from "@/stores/usePropertyStore";

export default function ConsultationFee({ property }: { property: Property }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Agent Consultation Fee</Text>
			<Text style={styles.fee}>{property.unlock_cost || 0} MMK</Text>
			<Text style={styles.note}>✦ Free consultation — Limited Offer</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 8,
		marginVertical: 8,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		alignItems: "center", // center horizontally
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 6,
		textAlign: "center",
	},
	fee: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 6,
		textAlign: "center",
	},
	note: { fontSize: 12, color: "#555", textAlign: "center" },
});
