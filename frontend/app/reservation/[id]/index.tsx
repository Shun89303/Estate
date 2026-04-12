import { useLocalSearchParams, useRouter } from "expo-router";
import {
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_RESERVES } from "@/mock/reserves";
import BackButton from "@/components/common/navigation/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import {
	CircleCheckBig,
	CircleAlert,
	Coins,
	Calendar,
	MapPin,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function ReservationDetails() {
	const colors = useTheme();
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const reserve = MOCK_RESERVES.find((item) => item.id.toString() === id);

	if (!reserve) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.notFound}>
					<BodyText>Reservation not found</BodyText>
					<TouchableOpacity onPress={() => router.back()}>
						<BodyText style={{ color: colors.primaryGold }}>Go Back</BodyText>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	const isApproved = reserve.status === "Approved";

	return (
		<SafeAreaView style={[styles.container]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header row */}
				<View style={styles.headerRow}>
					<BackButton />
					<PageTitle style={styles.title}>Reservation Details</PageTitle>
				</View>

				{/* Image */}
				<Image source={{ uri: reserve.image }} style={styles.image} />

				{/* Property Info Row */}
				<View style={styles.propertyRow}>
					<View style={{ flex: 1 }}>
						<NormalTitle
							style={[
								styles.propertyName,
								{
									fontWeight: "600",
								},
							]}
						>
							{reserve.title}
						</NormalTitle>
						<View style={styles.locationRow}>
							<MapPin size={14} color={colors.primaryGold} />
							<BodyText style={styles.location}>{reserve.location}</BodyText>
						</View>
					</View>
					<View
						style={[
							styles.statusBadge,
							{
								backgroundColor: isApproved
									? colors.primaryGreen + 20
									: colors.primaryGold + 20,
							},
						]}
					>
						{isApproved ? (
							<CircleCheckBig size={12} color={colors.primaryGreen} />
						) : (
							<CircleAlert size={12} color={colors.primaryGold} />
						)}
						<SmallTitle
							style={[
								styles.statusText,
								{
									color: isApproved ? colors.primaryGreen : colors.primaryGold,
								},
							]}
						>
							{reserve.status}
						</SmallTitle>
					</View>
				</View>

				{/* Progress Box */}
				<View style={[styles.box, { backgroundColor: colors.background }]}>
					<NormalTitle
						style={[
							styles.boxTitle,
							{
								color: colors.primaryGray,
							},
						]}
					>
						Reservation Progress
					</NormalTitle>
					<View style={styles.progressRow}>
						<View style={styles.progressItem}>
							<View
								style={[
									styles.iconCircle,
									{ backgroundColor: colors.primaryGreen + 20 },
								]}
							>
								<CircleCheckBig size={16} color={colors.primaryGreen} />
							</View>
							<BodyText
								style={[
									styles.progressText,
									{
										color: colors.primaryGreen,
									},
								]}
							>
								Reserved
							</BodyText>
						</View>
						<View style={styles.progressBarContainer}>
							<View
								style={[
									styles.progressBar,
									{
										backgroundColor: isApproved
											? colors.primaryGreen
											: colors.primaryGray + 50,
									},
									{ flex: isApproved ? 1 : 0 },
								]}
							/>
						</View>
						<View style={styles.progressItem}>
							<View
								style={[
									styles.iconCircle,
									{
										backgroundColor: isApproved
											? colors.primaryGreen + 20
											: colors.primaryGold + 20,
									},
								]}
							>
								{isApproved ? (
									<CircleCheckBig size={16} color={colors.primaryGreen} />
								) : (
									<CircleAlert size={16} color={colors.primaryGold} />
								)}
							</View>
							<BodyText
								style={[
									styles.progressText,
									{
										color: isApproved
											? colors.primaryGreen
											: colors.primaryGold,
									},
								]}
							>
								{isApproved ? "Approved" : "Reviewing"}
							</BodyText>
						</View>
					</View>
				</View>

				{/* Info Box (Listing Price & Coins Paid) */}
				<View
					style={[
						styles.box,
						styles.infoRow,
						{ backgroundColor: colors.background },
					]}
				>
					<View>
						<BodyText style={styles.label}>Listing Price</BodyText>
						<NormalTitle
							style={[
								styles.value,
								{
									color: colors.primaryGold,
								},
							]}
						>
							฿{reserve.price.toLocaleString()}
						</NormalTitle>
					</View>
					<View>
						<BodyText style={styles.label}>Coins Paid</BodyText>
						<View style={styles.coinsRow}>
							<Coins size={16} color={colors.primaryGold} />
							<NormalTitle
								style={[
									styles.value,
									{
										color: colors.primaryGold,
									},
								]}
							>
								{reserve.coins}
							</NormalTitle>
						</View>
					</View>
				</View>

				{/* Agent Box */}
				<View style={[styles.agentBox, { backgroundColor: colors.background }]}>
					<Image
						source={{ uri: reserve.agentImage }}
						style={styles.agentImage}
					/>
					<View>
						<NormalTitle style={styles.agentName}>
							{reserve.agentName}
						</NormalTitle>
						<View style={styles.agentSubRow}>
							<BodyText style={styles.agentSub}>
								Reserved on {reserve.reservedDate}
							</BodyText>
						</View>
					</View>
				</View>

				{/* Details Box */}
				<View
					style={[
						styles.box,
						{
							borderWidth: 1,
							borderColor: colors.primaryGray + 50,
							backgroundColor: colors.primaryGray + 10,
						},
					]}
				>
					<NormalTitle
						style={[
							styles.boxTitle,
							{
								color: colors.primaryGray,
							},
						]}
					>
						Details
					</NormalTitle>
					<BodyText
						style={[
							styles.bodyText,
							{
								color: colors.textPrimary,
							},
						]}
					>
						{reserve.details}
					</BodyText>
				</View>

				{/* Conditional UI for Approved or Pending */}
				{isApproved ? (
					<View
						style={[
							styles.box,
							{
								borderWidth: 1,
								borderColor: colors.primaryGreen + 50,
								backgroundColor: colors.primaryGreen + 20,
							},
						]}
					>
						<NormalTitle
							style={[
								styles.boxTitle,
								{
									color: colors.primaryGray,
								},
							]}
						>
							Agent Memo
						</NormalTitle>
						<SmallTitle
							style={[
								styles.bodyText,
								{
									color: colors.textPrimary,
									fontSize: 15,
								},
							]}
						>
							Reservation confirmed. Please complete the deposit payment of ฿
							{reserve.depositAmount?.toLocaleString()} within 7 days.
						</SmallTitle>
					</View>
				) : (
					<View
						style={[
							styles.reviewBox,
							{
								backgroundColor: colors.primaryGold + 20,
								borderColor: colors.primaryGold + 50,
							},
						]}
					>
						<CircleAlert size={48} color={colors.primaryGold} />
						<NormalTitle style={styles.reviewTitle}>
							Awaiting agent review
						</NormalTitle>
						<BodyText style={styles.reviewSubtitle}>
							You&apos;ll be notified once the agent responds
						</BodyText>
					</View>
				)}
			</ScrollView>
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
		marginBottom: 0,
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
	propertyName: {
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
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
	},
	statusText: {
		fontSize: 11,
		fontWeight: "600",
	},
	box: {
		borderRadius: 12,
		padding: 12,
		marginBottom: 16,
		...globalStyles.shadows,
	},
	boxTitle: {
		fontSize: 16,
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
		gap: 4,
	},
	iconCircle: {
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	progressText: {
		fontSize: 11,
		marginTop: 2,
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
		height: "100%",
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	label: {
		fontSize: 12,
	},
	value: {
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 4,
	},
	coinsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 4,
		justifyContent: "flex-end",
	},
	agentBox: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
		marginBottom: 16,
		...globalStyles.shadows,
	},
	agentImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 12,
	},
	agentName: {
		fontWeight: "600",
		marginBottom: 2,
	},
	agentSubRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	agentSub: {
		fontSize: 12,
	},
	bodyText: {
		fontSize: 12,
		lineHeight: 18,
	},
	reviewBox: {
		alignItems: "center",
		padding: 20,
		borderRadius: 12,
		marginBottom: 16,
		borderWidth: 1,
	},
	reviewTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginTop: 8,
	},
	reviewSubtitle: {
		fontSize: 12,
		marginTop: 4,
		textAlign: "center",
	},
});
