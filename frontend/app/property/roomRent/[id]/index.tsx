import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MOCK_ROOM_RENT, RoomRentProperty } from "@/mock/roomRent";
import MediaCarousel from "@/components/common/utils/MediaCarousel";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import NotFound from "@/components/common/state/NotFound";
import Badge from "@/components/common/utils/Badge";
import UniqueCode from "@/components/common/utils/UniqueCode";
import LocationRow from "@/components/common/utils/LocationRow";
import ChipList from "@/components/common/utils/ChipList";
import TextSection from "@/components/common/utils/TextSection";
import OwnerContact from "@/components/common/utils/OwnerContact";
import PropertyCTAButtons from "@/components/common/navigation/PropertyCTAButtons";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { SavedItem } from "@/stores/savedPropertiesStore";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";
import { formatPrice } from "@/utils/formatPrice";
import { maskPhoneNumber } from "@/utils/maskPhoneNumber";
import { Calendar, Users, Shield } from "lucide-react-native";

export default function RoomRentDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<RoomRentProperty | null>(null);

	useEffect(() => {
		if (!id) return;
		const found = MOCK_ROOM_RENT.find((p) => p.uniqueCode === id);
		setProperty(found || null);
	}, [id]);

	if (!property) return <NotFound title="Room Not Found" />;

	const savedItem: SavedItem = {
		uniqueCode: property.uniqueCode,
		category: "roomRent",
		coverImage: property.media.cover,
		title: property.title,
		location: property.location.address,
		priceDisplay: `฿${property.price.rent.toLocaleString()}/mo`,
		price: property.price.rent,
	};

	const amenities = Object.keys(property.amenities).filter(
		(k) => property.amenities[k],
	);
	const houseRules = Object.keys(property.houseRules).filter(
		(k) => property.houseRules[k],
	);

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

				<View style={styles.content}>
					{/* Header row */}
					<View style={styles.headerRow}>
						<Badge
							label={property.propertyType}
							backgroundColor={lightColors.brandBG}
							color={lightColors.brand}
							textVariant="small"
						/>
						{property.isNew && (
							<Title variant="small" style={styles.newBadge}>
								NEW
							</Title>
						)}
						<UniqueCode
							code={property.uniqueCode}
							style={styles.uniqueCodeRight}
						/>
					</View>

					<Title variant="normal">{property.title}</Title>
					<LocationRow location={property.location.address} />

					{/* Combined Price & Available container (kept as is) */}
					<View
						style={[
							styles.combinedBox,
							{
								backgroundColor: lightColors.background,
								...globalStyles.shadows,
							},
						]}
					>
						<View style={styles.priceInnerBox}>
							<View style={{ flex: 1 }}>
								<Title
									variant="page"
									style={{ marginBottom: 0, color: lightColors.brand }}
								>
									฿{formatPrice(property.price.rent)}/mo
								</Title>
								<BodyText variant="small" style={styles.priceSubtitle}>
									per month
								</BodyText>
							</View>
							<View style={{ flex: 1 }}>
								<Title variant="normal" style={styles.priceTitle}>
									Deposit: ฿{formatPrice(property.price.deposit)}
								</Title>
								<BodyText variant="small" style={styles.priceSubtitle}>
									Min {property.price.minContractMonths} months contract
								</BodyText>
							</View>
						</View>
						<View style={styles.availableRow}>
							<Calendar size={moderateScale(14)} color={lightColors.brand} />
							<BodyText variant="small">
								Available from: {property.price.availableFrom}
							</BodyText>
						</View>
					</View>

					{/* Roommate Info Box (kept as is) */}
					{property.roommateInfo && (
						<View
							style={[
								styles.infoBox,
								{
									backgroundColor: lightColors.background,
									...globalStyles.shadows,
								},
							]}
						>
							<Title variant="small">Roommate Info</Title>
							<View style={styles.roommateRow}>
								<Users size={moderateScale(16)} color={lightColors.brand} />
								<BodyText variant="small">
									{property.roommateInfo.occupiedSpots} of{" "}
									{property.roommateInfo.totalSpots} spots taken
								</BodyText>
								{property.roommateInfo.preferences && (
									<View
										style={[
											styles.preferencePill,
											{ backgroundColor: lightColors.brandBG },
										]}
									>
										<BodyText
											variant="small"
											style={{ color: lightColors.brand }}
										>
											{property.roommateInfo.preferences}
										</BodyText>
									</View>
								)}
							</View>
						</View>
					)}

					{/* Amenities */}
					<ChipList
						title="Amenities"
						items={amenities}
						direction="row"
						textColor={lightColors.bigTitleText}
						backgroundColor={lightColors.mutedBackgroundWeaker}
					/>

					{/* House Rules (column with icons) */}
					<ChipList
						title="House Rules"
						items={houseRules}
						direction="column"
						icon={Shield}
						iconColor={lightColors.brand}
						textColor={lightColors.bigTitleText}
						backgroundColor={"transparent"}
						chipStyle={{ borderRadius: scaleSize(10), alignSelf: "stretch" }}
					/>

					{/* About */}
					{property.description && (
						<TextSection
							title="About"
							description={property.description}
							titleVariant="small"
						/>
					)}

					{/* Map */}
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
					/>

					{/* Agent / Owner Contact */}
					<OwnerContact
						name={property.agent.name}
						phone={maskPhoneNumber(property.agent.phone)}
						profileImage={property.agent.profileImage}
					/>
				</View>
			</ScrollView>

			{/* Bottom CTA Buttons */}
			<PropertyCTAButtons
				propertyTitle={property.title}
				reserveCoins={property.reserveCoins}
				reserveCategory="Room Reserve"
				onConsultationPress={() =>
					router.push({
						pathname: "/booking/[id]",
						params: {
							id: property.id,
							uniqueCode: property.uniqueCode,
							image: property.media.cover,
							title: property.title,
							location: property.location.address,
							bedrooms: 0,
							price: 0,
						},
					})
				}
				onReserveSuccess={() => console.log("Reserved", property.title)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: {
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.xl,
		gap: spacing.lg,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginTop: spacing.md,
	},
	newBadge: { color: lightColors.danger, fontWeight: "bold", marginBottom: 0 },
	uniqueCodeRight: { marginLeft: "auto" },
	combinedBox: { borderRadius: scaleSize(16) },
	priceInnerBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: spacing.md,
	},
	priceTitle: { fontWeight: "600", marginBottom: scaleSize(2) },
	priceSubtitle: { fontSize: moderateScale(12) },
	availableRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(6),
		padding: spacing.md,
		borderTopWidth: scaleSize(1),
		borderTopColor: lightColors.mutedBorder,
	},
	infoBox: { padding: spacing.md, borderRadius: scaleSize(16) },
	roommateRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: scaleSize(8),
	},
	preferencePill: {
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(4),
		borderRadius: scaleSize(20),
	},
});
