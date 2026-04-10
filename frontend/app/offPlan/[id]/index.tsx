import { useState } from "react";
import Metric from "@/components/offPlan/Metric";
import {
	View,
	Pressable,
	Image,
	ScrollView,
	StyleSheet,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { MOCK_OFFPLAN, OffPlanProperty, UnitType } from "@/mock/offPlan";
import { PropertyMap } from "@/components/common/PropertyMap";
import MediaCarousel from "@/components/common/MediaCarousel";
import NotFound from "@/components/common/NotFound";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import {
	TrendingUp,
	Building2,
	MapPin,
	Calculator,
	Bot,
	Calendar,
	Maximize,
	Bath,
	BedDouble,
	CreditCard,
	ShieldCheck,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";
import formatPriceShort from "@/utils/formatPriceShort";

export default function OffPlanDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [unitFilter, setUnitFilter] = useState<string>("All");
	const [activeTab, setActiveTab] = useState<"Units" | "Payment" | "Trust">(
		"Units",
	);
	const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);
	const colors = useTheme();

	const property: OffPlanProperty | undefined = MOCK_OFFPLAN.find(
		(p) => p.id.toString() === id,
	);

	if (!property) return <NotFound title="Off-Plan Project Not Found" />;

	const availableUnitsCount = property.units.filter(
		(u) => u.status === "Available",
	).length;
	const paymentCalculated =
		selectedUnit &&
		property.paymentPlan.calculateAmounts(selectedUnit.priceTotal);
	const unitTypes = Array.from(new Set(property.units.map((u) => u.type)));
	const filteredUnits =
		unitFilter === "All"
			? property.units
			: property.units.filter((u) => u.type === unitFilter);

	const metricColors = {
		rentalYield: {
			bg: "#E8F5E9",
			icon: colors.primaryGreen,
			value: colors.primaryGreen,
		},
		annualGrowth: {
			bg: colors.primaryGold + 20,
			icon: colors.primaryGold,
			value: colors.primaryGold,
		},
		available: {
			bg: colors.primaryGray + 20,
			icon: colors.textPrimary,
			value: colors.textPrimary,
		},
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.images}
					videos={property.media.videos}
					onLike={() => console.log("Like")}
					onShare={() => console.log("Share")}
					isOffPlan={true}
					offPlanData={{
						uniqueCode: property.uniqueCode,
						title: property.title,
						developerName: property.developerName,
					}}
				/>

				{/* STATS ROW */}
				<View style={styles.statsRow}>
					<Metric
						icon={TrendingUp}
						value={property.rentalYield}
						label="Rental Yield"
						iconColor={metricColors.rentalYield.icon}
						valueColor={metricColors.rentalYield.value}
						bgColor={metricColors.rentalYield.bg}
					/>
					<Metric
						icon={TrendingUp}
						value={property.annualGrowth}
						label="Est. Growth"
						iconColor={metricColors.annualGrowth.icon}
						valueColor={metricColors.annualGrowth.value}
						bgColor={metricColors.annualGrowth.bg}
					/>
					<Metric
						icon={Building2}
						value={property.unitsLeft.toString()}
						label="Units Left"
						iconColor={metricColors.available.icon}
						valueColor={metricColors.available.value}
						bgColor={metricColors.available.bg}
					/>
				</View>

				{/* PRICE & LOCATION CARD */}
				<View style={[styles.infoCard, { backgroundColor: "#fff" }]}>
					<BodyText style={styles.startingFrom}>Starting from</BodyText>
					<PageTitle style={{ color: colors.primaryGold, marginBottom: 4 }}>
						{property.priceRange}
					</PageTitle>
					<View style={styles.rowBetween}>
						<View style={styles.completionRow}>
							<Calendar size={14} color={colors.primaryGray} />
							<BodyText style={styles.completionText}>
								Completion: {property.completionDate}
							</BodyText>
						</View>
						<View style={styles.locationRow}>
							<MapPin size={14} color={colors.primaryGray} />
							<BodyText style={styles.locationText}>
								{property.locationAddress}
							</BodyText>
						</View>
					</View>
				</View>

				{/* TAB TOGGLE */}
				<View
					style={[
						styles.toggleContainer,
						{
							backgroundColor: colors.primaryGray + 10,
						},
					]}
				>
					<Pressable
						style={[
							styles.toggleButton,
							activeTab === "Units" && styles.toggleButtonActive,
						]}
						onPress={() => setActiveTab("Units")}
					>
						<BodyText
							style={
								activeTab === "Units"
									? [styles.toggleText, styles.toggleTextActive]
									: styles.toggleText
							}
						>
							Units ({availableUnitsCount})
						</BodyText>
					</Pressable>
					<Pressable
						style={[
							styles.toggleButton,
							activeTab === "Payment" && styles.toggleButtonActive,
						]}
						onPress={() => setActiveTab("Payment")}
					>
						<BodyText
							style={
								activeTab === "Payment"
									? [styles.toggleText, styles.toggleTextActive]
									: styles.toggleText
							}
						>
							Payment Plan
						</BodyText>
					</Pressable>
					<Pressable
						style={[
							styles.toggleButton,
							activeTab === "Trust" && styles.toggleButtonActive,
						]}
						onPress={() => setActiveTab("Trust")}
					>
						<BodyText
							style={
								activeTab === "Trust"
									? [styles.toggleText, styles.toggleTextActive]
									: styles.toggleText
							}
						>
							Trust & Safety
						</BodyText>
					</Pressable>
				</View>

				{/* TAB CONTENT */}
				{activeTab === "Units" && (
					<View style={styles.tabContent}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.filterScroll}
						>
							{["All", ...unitTypes].map((type) => (
								<Pressable
									key={type}
									onPress={() => {
										setUnitFilter(type);
										setSelectedUnit(null);
									}}
									style={[
										styles.filterChip,
										unitFilter === type && {
											backgroundColor: colors.primaryGold,
										},
									]}
								>
									<BodyText
										style={
											unitFilter === type
												? [styles.filterText, styles.filterTextActive]
												: styles.filterText
										}
									>
										{type}
									</BodyText>
								</Pressable>
							))}
						</ScrollView>

						<FlatList
							scrollEnabled={false}
							data={filteredUnits}
							keyExtractor={(item, index) => `${item.type}-${index}`}
							renderItem={({ item: u }) => {
								const isSelected =
									selectedUnit?.type === u.type &&
									selectedUnit?.floor === u.floor &&
									selectedUnit?.priceTotal === u.priceTotal;
								return (
									<Pressable
										onPress={() => {
											if (isSelected) {
												setSelectedUnit(null);
											} else {
												setSelectedUnit(u);
											}
										}}
										style={[
											styles.unitCard,
											isSelected && {
												borderWidth: 1,
												borderColor: colors.primaryGold,
												...globalStyles.shadows,
											},
										]}
									>
										<View style={{ flex: 1 }}>
											{/* Title row: type + status pill */}
											<View style={styles.unitHeaderRow}>
												<NormalTitle>{u.type}</NormalTitle>
												<View
													style={[
														styles.statusPill,
														{
															backgroundColor:
																u.status === "Available"
																	? colors.secondaryGreen
																	: u.status === "Reserved"
																		? colors.secondaryGold
																		: colors.secondaryMute,
														},
													]}
												>
													<BodyText
														style={{
															color:
																u.status === "Available"
																	? colors.primaryGreen
																	: u.status === "Reserved"
																		? colors.primaryGold
																		: colors.textSecondary,
															fontWeight: "500",
															fontSize: 10,
														}}
													>
														{u.status}
													</BodyText>
												</View>
											</View>

											<BodyText>Floor {u.floor}</BodyText>

											{/* Specs row with icons */}
											<View style={styles.unitSpecsRow}>
												<View style={styles.specItem}>
													<Maximize size={12} color={colors.textSecondary} />
													<BodyText style={styles.specText}>
														{u.areaSqm} sqm
													</BodyText>
												</View>
												<View style={styles.specItem}>
													<BedDouble size={12} color={colors.textSecondary} />
													<BodyText style={styles.specText}>
														{u.bedrooms || 0} bed
													</BodyText>
												</View>
												<View style={styles.specItem}>
													<Bath size={12} color={colors.textSecondary} />
													<BodyText style={styles.specText}>
														{u.bathrooms} bath
													</BodyText>
												</View>
											</View>
										</View>

										<View
											style={{
												alignItems: "flex-end",
												justifyContent: "center",
											}}
										>
											<PageTitle
												style={{ fontSize: 16, color: colors.primaryGold }}
											>
												฿{formatPriceShort(u.priceTotal)}
											</PageTitle>
											<BodyText>฿{u.pricePerSqm.toLocaleString()}/sqm</BodyText>
										</View>
									</Pressable>
								);
							}}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 16 }}
						/>
					</View>
				)}

				{activeTab === "Payment" && (
					<View style={styles.tabContent}>
						<View style={[styles.infoCard, { backgroundColor: "#fff" }]}>
							{/* Title with credit card icon */}
							<View style={styles.paymentTitleRow}>
								<CreditCard size={20} color={colors.primaryGold} />
								<NormalTitle style={styles.infoTitle}>
									Payment Schedule
								</NormalTitle>
							</View>

							{/* Payment steps with numbered badges */}
							{property.paymentPlan.steps.map((s, i) => (
								<View key={i} style={styles.row}>
									<View style={styles.stepRow}>
										<View
											style={[
												styles.stepNumber,
												{ backgroundColor: colors.secondaryMute },
											]}
										>
											<BodyText
												style={{
													color: colors.primaryGold,
													fontWeight: "bold",
												}}
											>
												{i + 1}
											</BodyText>
										</View>
										<BodyText>{s.name}</BodyText>
									</View>
									<View
										style={[
											styles.percentagePill,
											{ backgroundColor: colors.secondaryMute },
										]}
									>
										<BodyText
											style={{ color: colors.primaryGold, fontWeight: "500" }}
										>
											{s.percentage}%
										</BodyText>
									</View>
								</View>
							))}

							{selectedUnit && <View style={styles.divider} />}
							{selectedUnit && (
								<>
									<BodyText style={{ marginBottom: 8 }}>
										For {selectedUnit.type} (฿
										{formatPriceShort(selectedUnit.priceTotal)})
									</BodyText>
									{paymentCalculated?.map((s, i) => (
										<View key={i} style={styles.row}>
											<BodyText>{s.name}</BodyText>
											<BodyText
												style={{ color: colors.textPrimary, fontWeight: "600" }}
											>
												฿{s.amount?.toLocaleString()}
											</BodyText>
										</View>
									))}
								</>
							)}
						</View>
					</View>
				)}

				{activeTab === "Trust" && (
					<View style={styles.tabContent}>
						<View style={[styles.infoCard, { backgroundColor: "#fff" }]}>
							<View style={styles.developerRow}>
								<Image
									source={{ uri: property.developer.image }}
									style={styles.devImg}
								/>
								<View style={styles.developerInfo}>
									<NormalTitle>{property.developer.name}</NormalTitle>
									<BodyText numberOfLines={1}>
										Est. {property.developer.establishedYear} •{" "}
										{property.developer.projectsCompleted} projects completed
									</BodyText>
								</View>
							</View>
							<BodyText style={styles.developerBio}>
								{property.developer.bio}
							</BodyText>
						</View>

						<View style={[styles.infoCard, { backgroundColor: "#fff" }]}>
							<View style={styles.paymentTitleRow}>
								<ShieldCheck size={20} color={colors.primaryGreen} />
								<NormalTitle style={styles.infoTitle}>
									Buyer Protection
								</NormalTitle>
							</View>
							{property.developer.buyerProtection.map((b, i) => (
								<View key={i} style={[styles.bulletRow]}>
									<View
										style={{
											backgroundColor: colors.secondaryGreen,
											padding: 5,
										}}
									>
										<ShieldCheck size={14} color={colors.primaryGreen} />
									</View>
									<BodyText>{b}</BodyText>
								</View>
							))}
						</View>
						<View
							style={[
								styles.infoCard,
								{
									borderWidth: 1,
									backgroundColor: colors.primaryGold + 20,
									borderColor: colors.primaryGold + 50,
								},
							]}
						>
							<NormalTitle style={styles.infoTitle}>
								🏆 Origin Property Track Record
							</NormalTitle>
							<View style={styles.tracksRow}>
								<View style={styles.trackColumn}>
									<NormalTitle
										style={[
											styles.trackValue,
											{
												color: colors.primaryGold,
											},
										]}
									>
										{property.developer.trackRecord?.projectsCount}
									</NormalTitle>
									<BodyText>Projects</BodyText>
								</View>
								<View style={styles.trackColumn}>
									<NormalTitle
										style={[
											styles.trackValue,
											{
												color: colors.primaryGold,
											},
										]}
									>
										{property.developer.trackRecord?.yearsCount}+
									</NormalTitle>
									<BodyText>Years</BodyText>
								</View>
								<View style={styles.trackColumn}>
									<NormalTitle
										style={[
											styles.trackValue,
											{
												color: colors.primaryGreen,
											},
										]}
									>
										SET
									</NormalTitle>
									<BodyText>
										{property.developer.trackRecord?.isSet
											? "Listed"
											: "Not Listed"}
									</BodyText>
								</View>
							</View>
						</View>
					</View>
				)}

				{/* FEATURES */}
				<View style={styles.simpleBox}>
					<NormalTitle style={styles.infoTitle}>Project Features</NormalTitle>
					<View style={styles.featuresContainer}>
						{Object.keys(property.features)
							.filter((k) => property.features[k])
							.map((k) => (
								<View
									key={k}
									style={[
										styles.featurePill,
										{ backgroundColor: colors.primaryGray + 20 },
									]}
								>
									<BodyText style={{ color: colors.textPrimary }}>{k}</BodyText>
								</View>
							))}
					</View>
				</View>

				{/* ABOUT */}
				<View style={styles.simpleBox}>
					<NormalTitle style={styles.infoTitle}>About</NormalTitle>
					<BodyText>{property.about}</BodyText>
				</View>

				{/* LANDMARKS */}
				<View style={styles.simpleBox}>
					<NormalTitle style={styles.infoTitle}>Nearby Landmarks</NormalTitle>
					<View style={styles.landmarksContainer}>
						{property.nearbyLandmarks.map((l, i) => (
							<View key={i} style={styles.landmarkRow}>
								<MapPin size={14} color={colors.primaryGold} />
								<BodyText>{l}</BodyText>
							</View>
						))}
					</View>
				</View>

				{/* MAP */}
				<View style={styles.simpleBox}>
					<NormalTitle style={styles.infoTitle}>Location</NormalTitle>
					<PropertyMap
						markers={[
							{
								id: property.id,
								latitude: property.latitude,
								longitude: property.longitude,
								title: property.title,
								description: property.locationAddress,
							},
						]}
						style={{ height: 200 }}
					/>
				</View>
			</ScrollView>

			{/* CTA BUTTONS */}
			<View style={styles.ctaContainer}>
				<View style={styles.ctaRow}>
					<Pressable
						style={[
							styles.ctaButton,
							{
								backgroundColor: colors.surface,
								borderColor: colors.border,
								borderWidth: 1,
							},
						]}
					>
						<Calculator size={18} color={colors.textPrimary} />
						<BodyText style={{ color: colors.textPrimary }}>
							Calculator
						</BodyText>
					</Pressable>
					<Pressable
						style={[
							styles.ctaButton,
							{
								backgroundColor: colors.surface,
								borderColor: colors.border,
								borderWidth: 1,
							},
						]}
					>
						<Bot size={18} color={colors.textPrimary} />
						<BodyText style={{ color: colors.textPrimary }}>
							AI Advisor
						</BodyText>
					</Pressable>
				</View>
				<Pressable
					style={[styles.mainCta, { backgroundColor: colors.primaryGold }]}
				>
					<BodyText style={{ color: "#fff", fontWeight: "600" }}>
						🏗️ Book Free Consultation
					</BodyText>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	statCol: { alignItems: "center", gap: 4 },
	statValue: { fontSize: 16, fontWeight: "bold" },
	statLabel: { fontSize: 12 },
	infoCard: {
		marginHorizontal: 16,
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
		...globalStyles.shadows,
	},
	startingFrom: { fontSize: 12, marginBottom: 4 },
	toggleContainer: {
		flexDirection: "row",
		borderRadius: 12,
		padding: 4,
		marginHorizontal: 16,
		marginBottom: 16,
	},
	toggleButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 8,
		borderRadius: 12,
	},
	toggleButtonActive: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	filterScroll: { marginBottom: 12 },
	filterChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginRight: 8,
		borderRadius: 12,
		backgroundColor: "#eee",
	},
	unitCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
		padding: 12,
		borderRadius: 12,
		backgroundColor: "#fff", // or colors.background
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 4,
	},
	divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },
	tabContent: { paddingHorizontal: 16, paddingBottom: 16 },
	simpleBox: { marginHorizontal: 16, marginBottom: 16, gap: 8 },
	infoTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
	devImg: { width: 60, height: 60, borderRadius: 12, marginBottom: 8 },
	ctaContainer: {
		padding: 16,
		borderTopWidth: 1,
		borderColor: "#eee",
		marginTop: 8,
	},
	ctaRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
	ctaButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		borderRadius: 12,
		gap: 6,
	},
	mainCta: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		borderRadius: 30,
		gap: 8,
	},
	rowBetween: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		alignItems: "flex-start",
		gap: 8,
		marginTop: 4,
	},
	completionText: {
		flexShrink: 1,
		flexBasis: "auto",
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		flexShrink: 1,
		flexWrap: "wrap",
	},
	locationText: {
		flexShrink: 1,
		flexBasis: "auto",
	},
	toggleText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#666",
	},
	toggleTextActive: {
		color: "#000",
		fontWeight: "600",
	},
	filterText: {
		fontSize: 12,
		color: "#333",
	},
	filterTextActive: {
		color: "#fff",
		fontWeight: "500",
	},
	completionRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	unitHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
	statusPill: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 12,
	},
	unitSpecsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginTop: 4,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	specText: {
		fontSize: 12,
	},
	paymentTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 12,
	},
	stepRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepNumber: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	percentagePill: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 20,
	},
	developerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 6,
	},
	developerInfo: {
		flex: 1,
	},
	developerBio: {
		marginTop: 8,
	},
	bulletRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginVertical: 2,
	},
	tracksRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},
	trackColumn: {
		alignItems: "center",
		flex: 1,
	},
	trackValue: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	featuresContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	featurePill: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	landmarksContainer: {
		flexDirection: "column",
		gap: 8,
	},
	landmarkRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
