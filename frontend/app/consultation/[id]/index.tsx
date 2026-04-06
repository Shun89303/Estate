import { useRouter, useLocalSearchParams } from "expo-router";
import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_CONSULTATIONS } from "@/mock/consultations";

export default function ConsultationDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const consultation = MOCK_CONSULTATIONS.find(
		(item) => item.id.toString() === id,
	);

	if (!consultation) {
		return (
			<SafeAreaView style={styles.container}>
				<Text>Consultation not found</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			{/* Title */}
			<Text style={styles.title}>Consultation Details</Text>

			{/* Property Image */}
			<Image source={{ uri: consultation.image }} style={styles.image} />

			{/* Property Info */}
			<View style={styles.propertyRow}>
				<View style={{ flex: 1 }}>
					<Text style={styles.propertyTitle}>{consultation.title}</Text>
					<Text style={styles.location}>{consultation.location}</Text>
				</View>

				<View style={styles.statusBadge}>
					<Text style={styles.statusText}>{consultation.status}</Text>
				</View>
			</View>

			{/* Agent Container */}
			<View style={styles.agentBox}>
				{/* Top section */}
				<View style={styles.agentTop}>
					<Image
						source={{ uri: consultation.agentImage }}
						style={styles.agentImage}
					/>

					<View>
						<Text style={styles.agentName}>{consultation.agent}</Text>
						<Text style={styles.agentSubtitle}>Your Consultant</Text>
					</View>
				</View>

				{/* Divider */}
				<View style={styles.divider} />

				{/* Bottom meta */}
				<Text style={styles.meta}>
					{consultation.date} • {consultation.time} • {consultation.method}
				</Text>
			</View>

			{/* Question Box */}
			<View style={styles.questionBox}>
				<Text style={styles.questionTitle}>Your Question</Text>
				<Text style={styles.questionText}>
					Is the price negotiable? What’s the maintenance fee?
				</Text>
			</View>

			{/* Actions (only if Upcoming) */}
			{consultation.status === "Upcoming" && (
				<View style={styles.actions}>
					<TouchableOpacity style={styles.reschedule}>
						<Text style={styles.rescheduleText}>Reschedule</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.cancel}>
						<Text style={styles.cancelText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},

	back: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 12,
	},

	title: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 12,
	},

	image: {
		width: "100%",
		height: 200,
		borderRadius: 12,
		marginBottom: 12,
	},

	propertyTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},

	location: {
		fontSize: 13,
		color: "#666",
		marginBottom: 4,
	},

	status: {
		fontSize: 12,
		color: "#000",
		fontWeight: "500",
		marginBottom: 16,
	},

	agentBox: {
		backgroundColor: "#f5f5f5",
		padding: 12,
		borderRadius: 12,
		marginBottom: 16,
	},

	agentImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 12,
	},

	agentName: {
		fontSize: 14,
		fontWeight: "600",
	},

	agentSubtitle: {
		fontSize: 12,
		color: "#666",
		marginBottom: 4,
	},

	meta: {
		fontSize: 12,
		color: "#666",
	},

	questionBox: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 12,
		padding: 12,
		marginBottom: 20,
	},

	questionTitle: {
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 6,
	},

	questionText: {
		fontSize: 12,
		color: "#666",
	},

	actions: {
		flexDirection: "row",
		gap: 12,
	},

	reschedule: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#000",
		alignItems: "center",
	},

	rescheduleText: {
		color: "#fff",
		fontWeight: "600",
	},

	cancel: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#eee",
		alignItems: "center",
	},

	cancelText: {
		color: "#333",
		fontWeight: "500",
	},
	propertyRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 16,
	},

	statusBadge: {
		backgroundColor: "#000",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
	},

	statusText: {
		color: "#fff",
		fontSize: 11,
		fontWeight: "600",
	},

	agentTop: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},

	divider: {
		height: 1,
		backgroundColor: "#e5e5e5",
		marginBottom: 10,
	},
});
