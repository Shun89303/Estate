import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_CONSULTATIONS } from "@/mock/consultations";
import BackButton from "@/components/common/navigation/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import { Calendar, Clock, Video, Phone, MapPin } from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function ConsultationDetails() {
	const router = useRouter();
	const colors = useTheme();
	const { id } = useLocalSearchParams();

	const consultation = MOCK_CONSULTATIONS.find(
		(item) => item.id.toString() === id,
	);

	if (!consultation) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.notFound}>
					<BodyText>Consultation not found</BodyText>
					<TouchableOpacity onPress={() => router.back()}>
						<BodyText style={{ color: colors.primaryGold }}>Go Back</BodyText>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			{/* Header row: BackButton + Title */}
			<View style={styles.headerRow}>
				<BackButton />
				<PageTitle style={styles.title}>Consultation Details</PageTitle>
			</View>

			{/* Property Image */}
			<Image source={{ uri: consultation.image }} style={styles.image} />

			{/* Property Info Row */}
			<View style={styles.propertyRow}>
				<View style={{ flex: 1 }}>
					<NormalTitle style={styles.propertyTitle}>
						{consultation.title}
					</NormalTitle>
					<View style={styles.locationRow}>
						<MapPin size={14} color={colors.primaryGold} />
						<BodyText style={styles.location}>{consultation.location}</BodyText>
					</View>
				</View>
				<View
					style={[
						styles.statusBadge,
						{
							backgroundColor:
								consultation.status === "Upcoming"
									? colors.primaryGold + 20
									: colors.primaryGray + 20,
						},
					]}
				>
					<SmallTitle
						style={[
							styles.statusText,
							{
								color:
									consultation.status === "Upcoming"
										? colors.primaryGold
										: colors.primaryGray,
							},
						]}
					>
						{consultation.status}
					</SmallTitle>
				</View>
			</View>

			{/* Agent Container */}
			<View style={[styles.agentBox, { backgroundColor: colors.background }]}>
				<View style={styles.agentTop}>
					<Image
						source={{ uri: consultation.agentImage }}
						style={styles.agentImage}
					/>
					<View>
						<NormalTitle style={styles.agentName}>
							{consultation.agent}
						</NormalTitle>
						<BodyText style={styles.agentSubtitle}>Your Consultant</BodyText>
					</View>
				</View>
				<View style={[styles.divider, { backgroundColor: colors.border }]} />
				<View style={styles.metaRow}>
					<View style={styles.metaItem}>
						<Calendar size={14} color={colors.primaryGold} />
						<BodyText style={styles.metaText}>{consultation.date}</BodyText>
					</View>
					<View style={styles.metaItem}>
						<Clock size={14} color={colors.primaryGold} />
						<BodyText style={styles.metaText}>{consultation.time}</BodyText>
					</View>
					<View style={styles.metaItem}>
						{consultation.method === "Zoom" ? (
							<Video size={14} color={colors.primaryGold} />
						) : (
							<Phone size={14} color={colors.primaryGold} />
						)}
						<BodyText style={styles.metaText}>{consultation.method}</BodyText>
					</View>
				</View>
			</View>

			{/* Question Box */}
			<View
				style={[
					styles.questionBox,
					{
						backgroundColor: colors.primaryGray + 10,
						borderColor: colors.primaryGray + 30,
					},
				]}
			>
				<SmallTitle
					style={[
						styles.questionTitle,
						{
							color: colors.primaryGray,
						},
					]}
				>
					Your Question
				</SmallTitle>
				<BodyText
					style={[
						styles.questionText,
						{
							color: colors.textPrimary,
						},
					]}
				>
					Is the price negotiable? What’s the maintenance fee?
				</BodyText>
			</View>

			{/* Actions (only if Upcoming) */}
			{consultation.status === "Upcoming" && (
				<View style={styles.actions}>
					<TouchableOpacity
						style={[
							styles.reschedule,
							{
								backgroundColor: colors.background,
								borderColor: colors.primaryGray + 50,
							},
						]}
					>
						<BodyText style={styles.rescheduleText}>Reschedule</BodyText>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.cancel,
							{
								backgroundColor: colors.primaryRed,
							},
						]}
					>
						<BodyText style={[styles.cancelText, { color: "#fff" }]}>
							Cancel
						</BodyText>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 12,
	},
	title: {
		marginBottom: 0, // remove default bottom margin of PageTitle
	},
	notFound: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 12,
		marginBottom: 12,
	},
	propertyRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 16,
	},
	propertyTitle: {
		marginBottom: 4,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	location: {
		fontSize: 13,
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
	},
	statusText: {
		fontSize: 11,
		fontWeight: "600",
	},
	agentBox: {
		padding: 12,
		borderRadius: 12,
		marginBottom: 16,
		...globalStyles.shadows,
	},
	agentTop: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	agentImage: {
		width: 50,
		height: 50,
		borderRadius: 15,
		marginRight: 12,
	},
	agentName: {
		fontSize: 14,
		fontWeight: "600",
	},
	agentSubtitle: {
		fontSize: 12,
	},
	divider: {
		height: 1,
		marginBottom: 10,
	},
	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 12,
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	metaText: {
		fontSize: 12,
	},
	questionBox: {
		borderRadius: 12,
		padding: 12,
		marginBottom: 20,
		borderWidth: 1,
	},
	questionTitle: {
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 6,
	},
	questionText: {
		fontSize: 12,
	},
	actions: {
		flexDirection: "row",
		gap: 12,
	},
	reschedule: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		borderRadius: 15,
		gap: 8,
		borderWidth: 1,
	},
	rescheduleText: {
		color: "#000000ff",
		fontWeight: "600",
	},
	cancel: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		borderRadius: 15,
		gap: 8,
	},
	cancelText: {
		fontWeight: "500",
	},
});
