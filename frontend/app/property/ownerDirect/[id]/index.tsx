import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MOCK_OWNERDIRECT, Property } from "@/mock/ownerDirect";
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
import { BedDouble, Bath, Maximize, Layers } from "lucide-react-native";

export default function OwnerDetails() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_OWNERDIRECT.find((p) => p.uniqueCode === id);
		setProperty(found || null);
	}, [id]);

	if (!property) return <NotFound title="Property Not Found" />;

	const savedItem: SavedItem = {
		uniqueCode: property.uniqueCode,
		category: "ownerDirect",
		coverImage: property.media.cover,
		title: property.title,
		location: property.location.address,
		priceDisplay: `฿${property.price.toLocaleString()}`,
		price: property.price,
	};

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

				<View style={styles.content}>
					{/* Price */}
					<Title variant="page" style={styles.price}>
						฿{property.price.toLocaleString()}
					</Title>

					{/* Info row: type badge + unique code */}
					<View style={styles.infoRow}>
						<Badge
							label={property.type}
							backgroundColor={lightColors.brandBG}
							color={lightColors.brand}
							textVariant="small"
						/>
						<UniqueCode
							code={property.uniqueCode}
							style={styles.uniqueCodeRight}
						/>
					</View>

					<Title variant="normal" style={styles.title}>
						{property.title}
					</Title>
					<LocationRow location={property.location.address} />

					{/* Specs row (unchanged) */}
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
								{property.areaSqm}
							</Title>
							<BodyText variant="small" style={styles.specLabel}>
								Area (m²)
							</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Layers size={moderateScale(20)} color={lightColors.brand} />
							<Title variant="normal" style={styles.specValue}>
								{property.floor}
							</Title>
							<BodyText variant="small" style={styles.specLabel}>
								Floor
							</BodyText>
						</View>
					</View>

					{/* Features */}
					{activeFeatures.length > 0 && (
						<ChipList
							title="Features"
							items={activeFeatures}
							direction="row"
							textColor={lightColors.bigTitleText}
							backgroundColor={lightColors.mutedBackgroundWeaker}
						/>
					)}

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

					{/* Owner Contact */}
					<OwnerContact
						name={property.owner.name}
						phone={property.owner.phone}
						profileImage={property.owner.image || ""}
					/>

					{/* Consultation Fee Box (kept as is) */}
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
							Owner Consultation Fee
						</Title>
						<Title variant="page" style={{ color: lightColors.danger }}>
							{property.owner.consultationFee.toLocaleString()} MMK
						</Title>
						<BodyText variant="small" style={styles.freeConsultText}>
							✦ Free consultation — Limited Offer
						</BodyText>
					</View>
				</View>
			</ScrollView>

			{/* CTA Buttons */}
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
							bedrooms: property.bedrooms,
							price: property.price,
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
	price: { marginBottom: 0 },
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: spacing.sm,
	},
	uniqueCodeRight: { marginLeft: "auto" },
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
	feeBox: {
		padding: spacing.lg,
		borderRadius: scaleSize(16),
		borderWidth: scaleSize(1),
		alignItems: "center",
	},
	freeConsultText: { textAlign: "center", color: lightColors.success },
});
