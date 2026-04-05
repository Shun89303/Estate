import { useRouter } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // For bell icon

export default function Success() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			{/* Title */}
			<Text style={styles.title}>Booking Confirmed</Text>

			{/* Sub-Title */}
			<Text style={styles.subtitle}>
				Your consultation has been reserved successfully.
			</Text>

			{/* Notification Box */}
			<View style={styles.notiBox}>
				<Ionicons name="notifications-outline" size={24} color="#000" />
				<Text style={styles.notiText}>
					You’ll receive a reminder before your appointment.
				</Text>
			</View>

			{/* Buttons */}
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.primaryButton}
					onPress={() => router.push("/bookings")} // Adjust path if needed
				>
					<Text style={styles.primaryButtonText}>View My Appointments</Text>
				</Pressable>

				<Pressable style={styles.textButton} onPress={() => router.push("/")}>
					<Text style={styles.textButtonText}>Back to Home</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
		color: "#555",
		textAlign: "center",
		marginBottom: 24,
	},
	notiBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		padding: 12,
		borderRadius: 8,
		marginBottom: 32,
	},
	notiText: {
		flex: 1,
		marginLeft: 12,
		fontSize: 14,
		color: "#000",
	},
	buttonContainer: {
		width: "100%",
		alignItems: "center",
	},
	primaryButton: {
		backgroundColor: "#000",
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 8,
		width: "100%",
		marginBottom: 12,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	textButton: {
		alignItems: "center",
		paddingVertical: 14,
		width: "100%",
	},
	textButtonText: {
		color: "#000",
		fontWeight: "600",
		fontSize: 16,
	},
});
