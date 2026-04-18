import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	MOCK_BUSINESS,
	BusinessProperty,
	BusinessPropertyType,
} from "@/mock/business";
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
import { Maximize, Users, Calendar } from "lucide-react-native";

const typeEmoji: Record<BusinessPropertyType, string> = {
	OFFICE: "🏢",
	CO_WORKING: "💻",
	SHOP_RETAIL: "🛍️",
	WAREHOUSE: "📦",
	RESTAURANT: "🍽️",
	EVENT_VENUE: "🎪",
};

export default function BusinessDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<BusinessProperty | null>(null);

	useEffect(() => {
		if (!id) return;
		const found = MOCK_BUSINESS.find((p) => p.uniqueCode === id);
		setProperty(found || null);
	}, [id]);

	if (!property) return <NotFound title="Business Space Not Found" />;

	const pricingUnit = property.pricing.type === "MONTHLY" ? "mo" : "day";
	const formattedPrice = `฿${property.pricing.amount.toLocaleString()}/${pricingUnit}`;
	const amenitiesList = Object.entries(property.amenities)
		.filter(([, value]) => value === true)
		.map(([key]) => key);
	const displayType = `${typeEmoji[property.type]} ${property.type.replace("_", " ")}`;

	const savedItem: SavedItem = {
		uniqueCode: property.uniqueCode,
		category: "business",
		coverImage: property.media.cover,
		title: property.title,
		location: property.location.address,
		priceDisplay:
			property.pricing.type === "DAILY"
				? `฿${property.pricing.amount.toLocaleString()}/d`
				: `฿${property.pricing.amount.toLocaleString()}/mo`,
		price: property.pricing.amount,
	};

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
					images={property.media.photos}
					videos={property.media.videos}
					onShare={() => console.log("Share")}
					savedItem={savedItem}
				/>

				<View style={styles.content}>
					{/* Header row: badge + unique code */}
					<View style={styles.headerRow}>
						<Badge
							label={displayType}
							backgroundColor={lightColors.brandBG}
							color={lightColors.brand}
							textVariant="small"
						/>
						<UniqueCode
							code={property.uniqueCode}
							style={styles.uniqueCodeRight}
						/>
					</View>

					<Title variant="normal">{property.title}</Title>
					<LocationRow location={property.location.address} />

					{/* Single white container box (kept as is) */}
					<View
						style={[
							styles.detailsBox,
							{
								backgroundColor: lightColors.background,
								...globalStyles.shadows,
							},
						]}
					>
						<Title variant="page" style={styles.price}>
							{formattedPrice}
						</Title>
						<View style={styles.specsRow}>
							<View style={styles.specItem}>
								<Maximize
									size={moderateScale(16)}
									color={lightColors.bodyText}
								/>
								<BodyText variant="small">{property.areaSqm} sqm</BodyText>
							</View>
							<View style={styles.specItem}>
								<Users size={moderateScale(16)} color={lightColors.bodyText} />
								<BodyText variant="small">
									{property.capacity} capacity
								</BodyText>
							</View>
							<View style={styles.specItem}>
								<Calendar
									size={moderateScale(16)}
									color={lightColors.bodyText}
								/>
								<BodyText variant="small">
									{property.minLeaseMonths} mo min
								</BodyText>
							</View>
						</View>
						<BodyText variant="normal" style={styles.deposit}>
							Deposit: ฿{property.pricing.deposit.toLocaleString()}
						</BodyText>
					</View>

					{/* Amenities */}
					{amenitiesList.length > 0 && (
						<ChipList
							title="Amenities"
							items={amenitiesList}
							direction="row"
							textColor={lightColors.bigTitleText}
							backgroundColor={lightColors.mutedBackgroundWeaker}
						/>
					)}

					{/* About */}
					{property.about && (
						<TextSection
							title="About"
							description={property.about}
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

					{/* Contact Agent */}
					<OwnerContact
						name={property.contact.name}
						phone={property.contact.phone}
						profileImage={property.contact.profileImage}
					/>
				</View>
			</ScrollView>

			{/* Bottom CTA */}
			<PropertyCTAButtons
				propertyTitle={property.title}
				reserveCoins={property.reserveCoins}
				reserveCategory="Business Reserve"
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
		justifyContent: "space-between",
		marginTop: spacing.md,
	},
	uniqueCodeRight: { marginLeft: "auto" },
	detailsBox: { padding: spacing.md, borderRadius: scaleSize(16) },
	price: { marginBottom: spacing.sm, color: lightColors.brand },
	specsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: spacing.md,
		marginBottom: spacing.sm,
	},
	specItem: { flexDirection: "row", alignItems: "center", gap: scaleSize(6) },
	deposit: { marginTop: scaleSize(2) },
});
