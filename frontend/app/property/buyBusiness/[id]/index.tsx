import { useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Users,
	Calendar,
	ChartColumn,
	CheckCircle2,
} from "lucide-react-native";

// Reusable components
import MediaCarousel from "@/components/common/utils/MediaCarousel";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";

// Data & types
import { BuyBusiness, MOCK_BUY_BUSINESS } from "@/mock/buyBusiness";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";
import formatPriceShort from "@/utils/formatPriceShort";
import { maskPhoneNumber } from "@/utils/maskPhoneNumber";
import NotFound from "@/components/common/state/NotFound";
import Badge from "@/components/common/utils/Badge";
import UniqueCode from "@/components/common/utils/UniqueCode";
import ChipList from "@/components/common/utils/ChipList";
import TextSection from "@/components/common/utils/TextSection";
import OwnerContact from "@/components/common/utils/OwnerContact";
import PropertyCTAButtons from "@/components/common/navigation/PropertyCTAButtons";
import LocationRow from "@/components/common/utils/LocationRow";
import { useEffect, useState } from "react";
import { SavedItem } from "@/stores/savedPropertiesStore";

export default function BuyBusinessDetails() {
	const { id } = useLocalSearchParams();
	const [business, setBusiness] = useState<BuyBusiness | null>(null);

	useEffect(() => {
		if (!id) return;
		const found = MOCK_BUY_BUSINESS.find((p) => p.uniqueCode === id);
		setBusiness(found || null);
	}, [id]);

	if (!business) {
		return (
			<NotFound
				title="Business Not Found"
				message="The business you're looking for doesn't exist or has been removed."
				showBack={true}
			/>
		);
	}

	// Extract highlights where value is true
	const activeHighlights = Object.keys(business.highlights).filter(
		(key) => business.highlights[key] === true,
	);
	const activeIncluded = Object.keys(business.includedInSale).filter(
		(key) => business.includedInSale[key] === true,
	);

	const getTypeWithEmoji = (type: BuyBusiness["type"]): string => {
		switch (type) {
			case "Restaurant":
				return "🍽️ RESTAURANT";
			case "Cafe":
				return "☕ CAFE";
			case "Hotel":
				return "🏨 HOTEL";
			case "Spa/Massage":
				return "💆 SPA/MASSAGE";
			case "Retail":
				return "🛍️ RETAIL";
			case "Franchise":
				return "🏪 FRANCHISE";
			default:
				return type;
		}
	};

	const savedItem: SavedItem = {
		uniqueCode: business.uniqueCode,
		category: "buyBusiness",
		coverImage: business.coverImage,
		title: business.title,
		location: business.location,
		priceDisplay: `฿${business.price.toLocaleString()}`,
		price: business.price,
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Media Carousel */}
				<MediaCarousel
					cover={business.coverImage}
					images={business.images}
					videos={business.videos || []}
					onShare={() => console.log("Share")}
					savedItem={savedItem}
				/>

				<View style={styles.content}>
					{/* Header row: type badge + unique code */}
					<View style={styles.headerRow}>
						<Badge
							label={getTypeWithEmoji(business.type)}
							backgroundColor={lightColors.brandBG}
							color={lightColors.brand}
							textVariant="small"
						/>
						<UniqueCode code={business.uniqueCode} />
					</View>

					{/* Title */}
					<Title variant="normal">{business.title}</Title>

					{/* Location */}
					<LocationRow location={business.location} />

					{/* Basic info container */}
					<View style={styles.infoContainer}>
						<BodyText variant="normal">ASKING PRICE</BodyText>
						<Title variant="page" style={styles.price}>
							฿{business.price.toLocaleString()}
						</Title>
						<View style={styles.specsRow}>
							<View style={styles.specItem}>
								<Users size={moderateScale(14)} color={lightColors.bodyText} />
								<BodyText variant="small" style={{ marginBottom: 0 }}>
									{business.staffs} staff
								</BodyText>
							</View>
							<View style={styles.specItem}>
								<Calendar
									size={moderateScale(14)}
									color={lightColors.bodyText}
								/>
								<BodyText variant="small" style={{ marginBottom: 0 }}>
									{business.years} years
								</BodyText>
							</View>
							<View style={styles.specItem}>
								<BodyText variant="small" style={{ marginBottom: 0 }}>
									{business.area} sqm
								</BodyText>
							</View>
						</View>
					</View>

					{/* Financial Summary */}
					<View style={styles.financialContainer}>
						<View style={styles.financialHeader}>
							<ChartColumn size={moderateScale(16)} color={lightColors.brand} />
							<Title variant="normal" style={styles.financialTitle}>
								Financial Summary
							</Title>
						</View>
						<View style={styles.financialRow}>
							<BodyText variant="normal" style={{ marginBottom: 0 }}>
								Monthly Revenue
							</BodyText>
							<BodyText
								variant="normal"
								style={[
									styles.financialValue,
									{ color: lightColors.bigTitleText },
								]}
							>
								฿{formatPriceShort(business.monthlyRevenue)}/mo
							</BodyText>
						</View>
						<View style={styles.financialRow}>
							<BodyText variant="normal" style={{ marginBottom: 0 }}>
								Monthly Profit
							</BodyText>
							<BodyText
								variant="normal"
								style={[styles.financialValue, { color: lightColors.success }]}
							>
								฿{formatPriceShort(business.monthlyProfit)}/mo
							</BodyText>
						</View>
						<View style={styles.divider} />
						<View style={styles.financialRow}>
							<BodyText variant="normal" style={{ marginBottom: 0 }}>
								ROI (est.)
							</BodyText>
							<BodyText variant="normal" style={styles.roiValue}>
								{business.roiEst}% /yr
							</BodyText>
						</View>
					</View>

					{/* Highlights */}
					<ChipList
						title="Highlights"
						items={activeHighlights}
						direction="row"
						icon={CheckCircle2}
						iconColor={lightColors.success}
						textColor={lightColors.bigTitleText}
						backgroundColor={lightColors.mutedBackgroundWeaker}
					/>

					{/* Included in Sale */}
					<ChipList
						title="Included in Sale"
						items={activeIncluded}
						direction="row"
						textColor={lightColors.brand}
						backgroundColor={lightColors.brandBG}
						chipStyle={{ borderRadius: scaleSize(20) }}
					/>

					{/* About This Business */}
					<TextSection
						title="About This Business"
						description={business.aboutThisBusiness}
					/>

					{/* Location Map */}
					<PropertyMap
						title="Location"
						markers={[
							{
								id: business.uniqueCode,
								latitude: business.geoLocation.latitude,
								longitude: business.geoLocation.longitude,
								title: business.title,
							},
						]}
					/>

					{/* Owner Contact */}
					<OwnerContact
						name={business.businessContact.name}
						phone={maskPhoneNumber(business.businessContact.phone)}
						profileImage={business.businessContact.profileImage}
					/>
				</View>
			</ScrollView>

			{/* Fixed Bottom CTA Buttons */}
			<PropertyCTAButtons
				propertyTitle={business.title}
				reserveCoins={business.reserveCoins}
				reserveCategory="Business Reserve"
				onConsultationPress={() => alert("Booking a Consultation")}
				onReserveSuccess={() => {
					// Optional: show success message or perform additional actions
					console.log("Reserved", business.title);
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightColors.entireAppBackground,
	},
	content: {
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.xl,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: spacing.md,
		marginBottom: spacing.sm,
	},
	infoContainer: {
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		padding: spacing.md,
		marginBottom: spacing.lg,
		...globalStyles.shadows,
	},
	price: {
		color: lightColors.brand,
	},
	specsRow: {
		flexDirection: "row",
		gap: spacing.md,
		marginTop: spacing.xs,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(4),
	},
	financialContainer: {
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		padding: spacing.md,
		marginBottom: spacing.lg,
		...globalStyles.shadows,
	},
	financialHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		marginBottom: spacing.sm,
	},
	financialTitle: {
		marginBottom: 0,
	},
	financialRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: spacing.sm,
	},
	financialValue: {
		fontWeight: "600",
		marginBottom: 0,
	},
	roiValue: {
		fontWeight: "700",
		color: lightColors.brand,
	},
	divider: {
		height: scaleSize(1),
		backgroundColor: lightColors.mutedBackgroundWeaker,
		marginVertical: spacing.sm,
	},
});
