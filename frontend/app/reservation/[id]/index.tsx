import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_RESERVES } from "@/mock/reserves";

export default function ReservationDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const reserve = MOCK_RESERVES.find((item) => item.id.toString() === id);

	if (!reserve) {
		return (
			<SafeAreaView style={styles.container}>
				<Text>Reservation not found</Text>
			</SafeAreaView>
		);
	}

	const isApproved = reserve.status === "Approved";

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			{/* Title */}
			<Text style={styles.title}>Reservation Details</Text>

			{/* Image */}
			<Image source={{ uri: reserve.image }} style={styles.image} />

			{/* Property Info */}
			<View style={styles.row}>
				<View style={{ flex: 1 }}>
					<Text style={styles.name}>{reserve.title}</Text>
					<Text style={styles.location}>{reserve.location}</Text>
				</View>

				<View
					style={[
						styles.badge,
						{ backgroundColor: isApproved ? "#000" : "#999" },
					]}
				>
					<Text style={styles.badgeText}>{reserve.status}</Text>
				</View>
			</View>

			{/* Progress Box */}
			<View style={styles.box}>
				<Text style={styles.boxTitle}>Reservation Progress</Text>

				<View style={styles.progressRow}>
					{/* Left */}
					<View style={styles.progressItem}>
						<Text>✔️</Text>
						<Text style={styles.progressText}>Reserved</Text>
					</View>

					{/* Bar */}
					<View style={styles.progressBarContainer}>
						<View style={[styles.progressBar, { flex: isApproved ? 1 : 0 }]} />
					</View>

					{/* Right */}
					<View style={styles.progressItem}>
						<Text>{isApproved ? "✔️" : "❗"}</Text>
						<Text style={styles.progressText}>
							{isApproved ? "Approved" : "Reviewing"}
						</Text>
					</View>
				</View>
			</View>

			{/* Info Box */}
			<View style={[styles.box, styles.infoRow]}>
				<View>
					<Text style={styles.label}>Listing Price</Text>
					<Text style={styles.value}>฿{reserve.price}</Text>
				</View>

				<View>
					<Text style={styles.label}>Coins Paid</Text>
					<Text style={styles.value}>🪙 {reserve.coins}</Text>
				</View>
			</View>

			{/* Agent */}
			<View style={styles.agentBox}>
				<Image source={{ uri: reserve.agentImage }} style={styles.agentImage} />
				<View>
					<Text style={styles.agentName}>{reserve.agentName}</Text>
					<Text style={styles.agentSub}>
						Reserved on {reserve.reservedDate}
					</Text>
				</View>
			</View>

			{/* Details */}
			<View style={styles.box}>
				<Text style={styles.boxTitle}>Details</Text>
				<Text style={styles.body}>{reserve.details}</Text>
			</View>

			{/* Conditional UI */}
			{isApproved ? (
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Agent Memo</Text>
					<Text style={styles.body}>
						Reservation confirmed. Please complete the deposit payment of ฿
						{reserve.depositAmount} within 7 days.
					</Text>
				</View>
			) : (
				<View style={styles.reviewBox}>
					<Text style={{ fontSize: 24 }}>❗</Text>
					<Text style={styles.reviewTitle}>Awaiting agent review</Text>
					<Text style={styles.reviewSubtitle}>
						You’ll be notified once the agent responds
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
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

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},

	name: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},

	location: {
		fontSize: 13,
		color: "#666",
	},

	badge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
	},

	badgeText: {
		color: "#fff",
		fontSize: 11,
		fontWeight: "600",
	},

	box: {
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 12,
		padding: 12,
		marginBottom: 16,
	},

	boxTitle: {
		fontWeight: "600",
		marginBottom: 10,
	},

	progressRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	progressItem: {
		alignItems: "center",
	},

	progressText: {
		fontSize: 11,
		marginTop: 4,
	},

	progressBarContainer: {
		flex: 1,
		height: 4,
		backgroundColor: "#eee",
		marginHorizontal: 8,
		borderRadius: 2,
		overflow: "hidden",
	},

	progressBar: {
		backgroundColor: "#000",
	},

	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	label: {
		fontSize: 12,
		color: "#666",
	},

	value: {
		fontSize: 14,
		fontWeight: "600",
		marginTop: 4,
	},

	agentBox: {
		flexDirection: "row",
		alignItems: "center",
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
		fontWeight: "600",
	},

	agentSub: {
		fontSize: 12,
		color: "#666",
	},

	body: {
		fontSize: 12,
		color: "#666",
	},

	reviewBox: {
		alignItems: "center",
		padding: 20,
	},

	reviewTitle: {
		fontWeight: "600",
		marginTop: 8,
	},

	reviewSubtitle: {
		fontSize: 12,
		color: "#666",
		marginTop: 4,
		textAlign: "center",
	},
});
