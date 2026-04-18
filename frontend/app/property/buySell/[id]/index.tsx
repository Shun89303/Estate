import { useEffect, useState } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_BUYSELL, Property } from "@/mock/buySell";
import MediaCarousel from "@/components/common/utils/MediaCarousel";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import NotFound from "@/components/common/state/NotFound";
import Badge from "@/components/common/utils/Badge";
import UniqueCode from "@/components/common/utils/UniqueCode";
import LocationRow from "@/components/common/utils/LocationRow";
import ChipList from "@/components/common/utils/ChipList";
import TextSection from "@/components/common/utils/TextSection";
import PropertyCTAButtons from "@/components/common/navigation/PropertyCTAButtons";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { SavedItem } from "@/stores/savedPropertiesStore";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";
import { BedDouble, Bath, Maximize, Layers } from "lucide-react-native";

export default function BuySellDetails() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_BUYSELL.find((p) => p.uniqueCode === id);
		setProperty(found || null);
	}, [id]);

	if (!property) return <NotFound />;

	const savedItem: SavedItem = {
		uniqueCode: property.uniqueCode,
		category: "buySell",
		coverImage: property.media.cover,
		title: property.title,
		location: property.location.address,
		priceDisplay: `฿${property.price.toLocaleString()}`,
		price: property.price,
	};

	// Extract features as array of keys where value is true
	const activeFeatures = Object.entries(property.features)
		.filter(([_, val]) => val === true)
		.map(([key]) => key);

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.images}
					videos={property.media.videos}
					onShare={() => console.log("Share")}
					savedItem={savedItem}
				/>

				{/* PROPERTY INFO */}
				<View style={styles.section}>
					<Title variant="page" style={styles.price}>
						฿{property.price.toLocaleString()}
					</Title>

					<View style={styles.infoRow}>
						<View style={styles.leftGroup}>
							<Badge
								label={property.type}
								backgroundColor={lightColors.brandBG}
								color={lightColors.brand}
								textVariant="small"
							/>
							{property.isNew && (
								<Title variant="small" style={styles.newBadge}>
									NEW
								</Title>
							)}
						</View>
						<UniqueCode
							code={property.uniqueCode}
							style={styles.uniqueCodeRight}
						/>
					</View>

					<Title variant="normal" style={styles.title}>
						{property.title}
					</Title>

					<LocationRow location={property.location.address} />

					{/* 4‑column specs (unchanged) */}
					<View style={styles.specsRow}>
						<View style={styles.specColumn}>
							<BedDouble size={moderateScale(20)} color={lightColors.brand} />
							<Title variant="normal" style={styles.specValue}>
								{property.bedrooms}
							</Title>
							<BodyText variant="small" style={styles.specLabel}>
								Bedrooms
							</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Bath size={moderateScale(20)} color={lightColors.brand} />
							<Title variant="normal" style={styles.specValue}>
								{property.bathrooms}
							</Title>
							<BodyText variant="small" style={styles.specLabel}>
								Bathrooms
							</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Maximize size={moderateScale(20)} color={lightColors.brand} />
							<Title variant="normal" style={styles.specValue}>
								{property.areaSqm} sqm
							</Title>
							<BodyText variant="small" style={styles.specLabel}>
								Area
							</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Layers size={moderateScale(20)} color={lightColors.brand} />
							<Title variant="normal" style={styles.specValue}>
								{property.floor}/{property.totalFloors}
							</Title>
							<BodyText variant="small" style={styles.specLabel}>
								Floor
							</BodyText>
						</View>
					</View>
				</View>

				{/* FEATURES (using ChipList) */}
				{activeFeatures.length > 0 && (
					<View style={{ paddingHorizontal: spacing.lg }}>
						<ChipList
							title="Features"
							items={activeFeatures}
							direction="row"
							textColor={lightColors.bigTitleText}
							backgroundColor={lightColors.mutedBackgroundWeaker}
							titleVariant="normal"
						/>
					</View>
				)}

				{/* ABOUT (using TextSection) */}
				{property.description && (
					<View style={{ paddingHorizontal: spacing.lg }}>
						<TextSection
							title="About"
							description={property.description}
							titleVariant="normal"
						/>
					</View>
				)}

				{/* MAP (using PropertyMap with title) */}
				<PropertyMap
					title="Location"
					markers={[
						{
							id: property.id,
							latitude: property.location.latitude,
							longitude: property.location.longitude,
							title: property.title,
							description: property.location.address,
						},
					]}
					style={{ marginHorizontal: spacing.lg }}
					titleVariant="normal"
				/>

				{/* AGENT BOX (unchanged) */}
				<View
					style={[styles.agentBox, { backgroundColor: lightColors.background }]}
				>
					<Title variant="normal">Property Agent</Title>
					<View style={styles.agentRow}>
						{property.agent.image && (
							<Image
								source={{ uri: property.agent.image }}
								style={styles.agentImage}
							/>
						)}
						<View style={styles.agentInfo}>
							<Title variant="small" style={styles.agentName}>
								{property.agent.name}
							</Title>
							<BodyText variant="small">
								{property.agent.experienceYears} years experience
							</BodyText>
							<View style={{ flexDirection: "row" }}>
								<BodyText
									variant="small"
									style={{ color: lightColors.bigTitleText }}
								>
									⭐ {property.agent.rating}
								</BodyText>
								<BodyText variant="small">
									{" "}
									({property.agent.reviewCount})
								</BodyText>
							</View>
						</View>
					</View>
				</View>

				{/* CONSULTATION FEE BOX (unchanged) */}
				<View
					style={[
						styles.feeBox,
						{
							backgroundColor: lightColors.brandBG,
							borderColor: lightColors.brandBorder,
						},
					]}
				>
					<Title variant="small" style={{ color: lightColors.bodyText }}>
						Agent Consultation Fee
					</Title>
					<Title variant="page" style={{ color: lightColors.danger }}>
						{property.agent.consultationFee.toLocaleString()} MMK
					</Title>
					<BodyText variant="small" style={styles.freeOffer}>
						✦ Free consultation — Limited Offer
					</BodyText>
				</View>
			</ScrollView>

			{/* CTA BUTTONS */}
			<PropertyCTAButtons
				propertyTitle={property.title}
				reserveCoins={property.reserveCoins}
				reserveCategory="Property Reserve"
				onConsultationPress={() =>
					router.push({
						pathname: "/booking/[id]",
						params: {
							id: property.id,
							uniqueCode: property.uniqueCode,
							image: property.media.cover,
							title: property.title,
							location: property.location.address,
							price: property.price,
							isAgent: 1,
							agentName: property.agent.name,
							agentImage: property.agent.image,
						},
					})
				}
				onReserveSuccess={() => {
					// optional: show a success toast or refresh
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
	price: { marginBottom: 0 },
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginVertical: spacing.sm,
	},
	leftGroup: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		flexShrink: 1,
	},
	uniqueCodeRight: {
		marginLeft: "auto",
	},
	newBadge: {
		color: lightColors.danger,
		fontWeight: "bold",
		marginBottom: 0,
	},
	title: { marginVertical: spacing.xs, lineHeight: moderateScale(24) },
	specsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: spacing.md,
		gap: spacing.sm,
	},
	specColumn: {
		alignItems: "center",
		flex: 1,
		gap: scaleSize(4),
		backgroundColor: lightColors.background,
		paddingVertical: spacing.sm,
		borderRadius: scaleSize(10),
		...globalStyles.shadows,
	},
	specValue: {
		fontSize: moderateScale(16),
		fontWeight: "bold",
		marginBottom: 0,
	},
	specLabel: { fontSize: moderateScale(12), color: lightColors.bodyText },
	agentBox: {
		marginTop: spacing.xl,
		marginHorizontal: spacing.lg,
		padding: spacing.md,
		borderRadius: scaleSize(16),
		...globalStyles.shadows,
	},
	agentRow: { flexDirection: "row", gap: spacing.sm, alignItems: "center" },
	agentImage: {
		width: scaleSize(60),
		height: scaleSize(60),
		borderRadius: scaleSize(12),
	},
	agentInfo: { flex: 1 },
	agentName: { fontWeight: "600", marginBottom: scaleSize(2) },
	feeBox: {
		marginTop: spacing.md,
		marginHorizontal: spacing.lg,
		padding: spacing.lg,
		borderRadius: scaleSize(16),
		borderWidth: scaleSize(1),
		alignItems: "center",
		marginBottom: spacing.md,
	},
	freeOffer: { textAlign: "center", color: lightColors.success },
});
