import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_CONSULTATIONS } from "@/mock/consultations";
import { MOCK_RESERVES } from "@/mock/reserves";
import BackButton from "@/components/common/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import {
	Calendar,
	ChevronRight,
	CircleAlert,
	CircleCheckBig,
	Clock,
	Coins,
	MessageCircle,
	Phone,
	Video,
} from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";

export default function Bookings() {
	const router = useRouter();
	const colors = useTheme();
	const [viewMode, setViewMode] = useState<"Consultations" | "Reserves">(
		"Consultations",
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<BackButton />
				<PageTitle>My Bookings</PageTitle>
				<Text style={{ width: 24 }} />
			</View>

			{/* SEGMENTED TOGGLE CONTROL */}
			<View style={styles.toggleContainer}>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						viewMode === "Consultations" && styles.toggleButtonActive,
					]}
					onPress={() => setViewMode("Consultations")}
				>
					<MessageCircle
						size={18}
						color={viewMode === "Consultations" ? "#000" : "#666"}
						style={styles.toggleIcon}
					/>
					<Text
						style={[
							styles.toggleText,
							viewMode === "Consultations" && styles.toggleTextActive,
						]}
					>
						Consultations
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.toggleButton,
						viewMode === "Reserves" && styles.toggleButtonActive,
					]}
					onPress={() => setViewMode("Reserves")}
				>
					<Coins
						size={18}
						color={viewMode === "Reserves" ? "#000" : "#666"}
						style={styles.toggleIcon}
					/>
					<Text
						style={[
							styles.toggleText,
							viewMode === "Reserves" && styles.toggleTextActive,
						]}
					>
						Reserves
					</Text>
				</TouchableOpacity>
			</View>

			{/* CONTENT */}
			{viewMode === "Consultations" ? (
				<FlatList
					key={viewMode}
					data={MOCK_CONSULTATIONS}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => router.push(`/consultation/${item.id}`)}
							activeOpacity={0.7}
						>
							<View style={styles.consultCard}>
								<View style={styles.imageContainer}>
									<Image
										source={{ uri: item.image }}
										style={styles.cardImage}
									/>
								</View>
								<View style={styles.cardInfo}>
									<View style={styles.cardHeader}>
										<View style={{ flex: 1 }}>
											<NormalTitle numberOfLines={1}>{item.title}</NormalTitle>
											<BodyText numberOfLines={1}>Agent: {item.agent}</BodyText>
										</View>
										<View
											style={[
												styles.statusBadge,
												{
													backgroundColor:
														item.status === "Upcoming"
															? colors.secondaryGold
															: colors.primaryMute,
												},
											]}
										>
											<BodyText
												style={{
													color:
														item.status === "Upcoming"
															? colors.primaryGold
															: colors.primaryGray,
													fontWeight: "700",
												}}
											>
												{item.status}
											</BodyText>
										</View>
									</View>
									<View style={styles.cardSubRow}>
										{/* Date */}
										<View style={styles.iconText}>
											<Calendar size={12} color="#666" />
											<View style={styles.textStack}>
												<BodyText style={styles.iconTextValue}>
													{item.date.split(",")[0]}
												</BodyText>
												<BodyText style={styles.iconTextValue}>
													{item.date.split(",")[1]?.trim()}
												</BodyText>
											</View>
										</View>

										{/* Time */}
										<View style={styles.iconText}>
											<Clock size={12} color="#666" />
											<View style={styles.textStack}>
												<BodyText style={styles.iconTextValue}>
													{item.time.split(" ")[0]}
												</BodyText>
												<BodyText style={styles.iconTextValue}>
													{item.time.split(" ")[1]}
												</BodyText>
											</View>
										</View>

										{/* Method (unchanged) */}
										<View style={styles.iconText}>
											{item.method === "Zoom" ? (
												<Video size={12} color="#666" />
											) : (
												<Phone size={12} color="#666" />
											)}
											<BodyText style={styles.iconTextValue}>
												{item.method}
											</BodyText>
										</View>
									</View>
								</View>
								<ChevronRight
									size={20}
									color={colors.primaryGray}
									style={styles.chevronIcon}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
			) : (
				<FlatList
					key={viewMode}
					data={MOCK_RESERVES}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={{
						paddingHorizontal: 16,
					}}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => router.push(`/reservation/${item.id}`)}
							activeOpacity={0.7}
						>
							<View style={styles.reserveCard}>
								<View style={styles.imageContainer}>
									<Image
										source={{ uri: item.image }}
										style={styles.cardImage}
									/>
								</View>
								<View style={styles.cardInfo}>
									<View style={styles.cardHeader}>
										<View style={{ flex: 1 }}>
											<NormalTitle numberOfLines={1}>{item.title}</NormalTitle>
											<BodyText numberOfLines={1}>
												{item.status === "Approved" ? "🏠" : "🛏️"}
												{item.location}
											</BodyText>
										</View>
										<View
											style={[
												styles.statusBadge,
												{
													backgroundColor:
														item.status === "Pending Review"
															? colors.secondaryGold
															: colors.secondaryGreen,
												},
											]}
										>
											{item.status === "Approved" ? (
												<CircleCheckBig size={12} color={colors.primaryGreen} />
											) : (
												<CircleAlert size={12} color={colors.primaryGold} />
											)}
											<BodyText
												style={{
													color:
														item.status === "Pending Review"
															? colors.primaryGold
															: colors.primaryGreen,
													fontWeight: "700",
												}}
											>
												{item.status}
											</BodyText>
										</View>
									</View>
									<View style={styles.cardBottomRow}>
										<NormalTitle
											style={{
												fontWeight: "bold",
												color: colors.primaryGold,
											}}
										>
											฿{item.price.toLocaleString()}
										</NormalTitle>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												gap: 5,
											}}
										>
											<Coins
												size={18}
												color={colors.primaryGold}
												style={styles.toggleIcon}
											/>
											<BodyText
												style={{
													color: colors.primaryGold,
												}}
											>
												{item.coins} coins
											</BodyText>
										</View>
									</View>
								</View>
								<ChevronRight
									size={20}
									color={colors.primaryGray}
									style={styles.chevronIcon}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	// Segmented toggle styles
	toggleContainer: {
		flexDirection: "row",
		backgroundColor: "#f0f0f0",
		borderRadius: 12, // square‑roundy (not pill)
		padding: 4,
		marginHorizontal: 16,
		marginVertical: 12,
	},
	toggleButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
		borderRadius: 8, // inner button also square‑roundy
		gap: 6,
	},
	toggleButtonActive: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	toggleIcon: {
		// no additional styles needed
	},
	toggleText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#666",
	},
	toggleTextActive: {
		color: "#000", // active text is black
		fontWeight: "600",
	},
	reserveCard: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	cardInfo: { flex: 1, paddingVertical: 15 },
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	cardTitle: { fontWeight: "bold", fontSize: 16 },
	cardSub: { color: "#666" },
	statusBadge: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 12,
		fontSize: 12,
		alignSelf: "flex-start",
		overflow: "hidden",
		flexDirection: "row",
		alignItems: "center",
	},
	cardSubRow: {
		flexDirection: "row",
		gap: 12,
		marginTop: 6,
		width: "100%", // ensure full parent width
	},
	cardBottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 6,
	},
	iconTextValue: {
		fontSize: 12,
		color: "#666",
		// no flex:1 – text will wrap naturally
	},
	consultCard: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingRight: 12,
		marginBottom: 12,
		overflow: "hidden",
	},
	imageContainer: {
		width: 100,
		marginRight: 12,
		overflow: "hidden",
		alignSelf: "stretch",
	},
	cardImage: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
	},
	chevronIcon: {
		marginLeft: 12,
		alignSelf: "center",
	},
	textStack: {
		flex: 1,
		flexDirection: "column",
		gap: 2,
		minWidth: 0,
	},
	iconText: {
		flexGrow: 1,
		flexBasis: 0, // forces equal width
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		minWidth: 0, // allows text to wrap inside
	},
});
