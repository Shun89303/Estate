import { useEffect, useState } from "react";
import {
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	MOCK_BUSINESS,
	BusinessProperty,
	BusinessPropertyType,
} from "@/mock/business";
import { PropertyMap } from "@/components/common/PropertyMap";
import MediaCarousel from "@/components/common/MediaCarousel";
import NotFound from "@/components/common/NotFound";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import {
	MapPin,
	Maximize,
	Users,
	Calendar,
	MessageCircle,
	Coins,
} from "lucide-react-native";
import { maskPhoneNumber } from "@/utils/maskPhoneNumber";
import globalStyles from "@/styles/styles";

// Emoji mapping for business types
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
	const { id } = useLocalSearchParams<{ id: string }>();
	const [property, setProperty] = useState<BusinessProperty | undefined>();
	const colors = useTheme();

	useEffect(() => {
		const found = MOCK_BUSINESS.find((p) => p.id.toString() === id);
		setProperty(found);
	}, [id]);

	if (!property) return <NotFound title="Business Space Not Found" />;

	const pricingUnit = property.pricing.type === "MONTHLY" ? "mo" : "day";
	const formattedPrice = `฿${property.pricing.amount.toLocaleString()}/${pricingUnit}`;
	const amenitiesList = Object.entries(property.amenities)
		.filter(([, value]) => value === true)
		.map(([key]) => key);
	const displayType = `${typeEmoji[property.type]} ${property.type.replace("_", " ")}`;

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.photos}
					videos={property.media.videos}
					onLike={() => console.log("Like")}
					onShare={() => console.log("Share")}
				/>

				<View style={styles.section}>
					<View style={styles.infoRow}>
						<View
							style={[
								styles.typePill,
								{ backgroundColor: colors.secondaryMute },
							]}
						>
							<SmallTitle style={{ color: colors.primaryGold }}>
								{displayType}
							</SmallTitle>
						</View>
						<BodyText
							style={{ color: colors.textSecondary, marginLeft: "auto" }}
						>
							{property.uniqueCode}
						</BodyText>
					</View>

					<NormalTitle style={styles.title}>{property.title}</NormalTitle>

					<View style={styles.locationRow}>
						<MapPin size={14} color={colors.primaryGold} />
						<BodyText style={styles.location}>
							{property.location.address}
						</BodyText>
					</View>

					{/* Single white container box */}
					<View style={[styles.detailsBox, { backgroundColor: "#fff" }]}>
						{/* Price */}
						<PageTitle
							style={{
								marginBottom: 8,
								fontSize: 24,
								color: colors.primaryGold,
							}}
						>
							{formattedPrice}
						</PageTitle>

						{/* Specs row (area, capacity, min lease) */}
						<View style={styles.specsRow}>
							<View style={styles.specItem}>
								<Maximize size={16} color={colors.primaryGray} />
								<BodyText>{property.areaSqm} sqm</BodyText>
							</View>
							<View style={styles.specItem}>
								<Users size={16} color={colors.primaryGray} />
								<BodyText>{property.capacity} capacity</BodyText>
							</View>
							<View style={styles.specItem}>
								<Calendar size={16} color={colors.primaryGray} />
								<BodyText>{property.minLeaseMonths} mo min</BodyText>
							</View>
						</View>

						{/* Deposit & min lease text */}
						<View style={styles.depositRow}>
							<NormalTitle
								style={{
									fontWeight: "600",
									color: colors.primaryGray,
								}}
							>
								Deposit: ฿{property.pricing.deposit.toLocaleString()}
							</NormalTitle>
						</View>
					</View>

					{/* Amenities as pills (horizontal) */}
					{amenitiesList.length > 0 && (
						<View style={styles.amenitiesSection}>
							<NormalTitle style={styles.infoTitle}>Amenities</NormalTitle>
							<View style={styles.amenitiesRow}>
								{amenitiesList.map((item, idx) => (
									<View
										key={idx}
										style={[
											styles.amenityPill,
											{ backgroundColor: colors.secondaryMute },
										]}
									>
										<BodyText style={{ color: colors.textPrimary }}>
											{item}
										</BodyText>
									</View>
								))}
							</View>
						</View>
					)}

					{/* About */}
					{property.about && (
						<View style={styles.simpleBox}>
							<NormalTitle style={styles.infoTitle}>About</NormalTitle>
							<BodyText>{property.about}</BodyText>
						</View>
					)}

					{/* Map */}
					<View style={styles.simpleBox}>
						<NormalTitle style={styles.infoTitle}>Location</NormalTitle>
						<PropertyMap
							markers={[
								{
									id: property.id,
									latitude: property.location.latitude,
									longitude: property.location.longitude,
									title: property.title,
									description: property.location.address,
								},
							]}
							style={{ height: 200 }}
						/>
					</View>

					{/* Contact Agent */}
					<View style={[styles.agentBox, { backgroundColor: "#fff" }]}>
						<Image
							source={{ uri: property.contact.profileImage }}
							style={styles.agentImage}
						/>
						<View style={styles.agentInfo}>
							<NormalTitle style={styles.agentName}>
								{property.contact.name}
							</NormalTitle>
							<BodyText>{maskPhoneNumber(property.contact.phone)}</BodyText>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Bottom CTA */}
			<View style={styles.ctaRow}>
				<TouchableOpacity
					style={[
						styles.ctaBtn,
						{
							backgroundColor: "#fff",
							borderColor: colors.primaryGray + 50,
							borderWidth: 1,
						},
					]}
					onPress={() =>
						router.push({
							pathname: "/booking/[id]",
							params: {
								id: property.id,
								image: property.media.cover,
								title: property.title,
								location: property.location.address,
								bedrooms: 0,
								price: 0,
							},
						})
					}
				>
					<MessageCircle size={18} color={colors.textPrimary} />
					<BodyText style={{ color: colors.textPrimary }}>
						Consultation
					</BodyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.ctaBtn, { backgroundColor: colors.primaryGold }]}
				>
					<Coins size={18} color="#fff" />
					<BodyText style={{ color: "#fff" }}>
						Reserve {property.reserveCoins} Coins
					</BodyText>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	section: { paddingHorizontal: 16, paddingVertical: 8, gap: 16 },
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 8,
	},
	typePill: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	title: { marginVertical: 4, lineHeight: 24 },
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 8,
	},
	location: { fontSize: 14, flexShrink: 1 },
	detailsBox: {
		padding: 16,
		borderRadius: 16,
		marginVertical: 8,
		...globalStyles.shadows,
	},
	specsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
		marginBottom: 12,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	depositRow: {
		marginTop: 4,
	},
	amenitiesSection: { gap: 8 },
	amenitiesRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	amenityPill: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	infoTitle: { fontWeight: "600", fontSize: 18, marginBottom: 4 },
	simpleBox: { gap: 8 },
	agentBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		padding: 16,
		borderRadius: 16,
		marginVertical: 8,
		...globalStyles.shadows,
	},
	agentImage: { width: 60, height: 60, borderRadius: 12 },
	agentInfo: { flex: 1 },
	agentName: { fontWeight: "600", marginBottom: 2 },
	ctaRow: {
		flexDirection: "row",
		padding: 16,
		gap: 12,
		borderTopWidth: 1,
		borderColor: "#eee",
	},
	ctaBtn: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		borderRadius: 15,
		gap: 8,
	},
});
