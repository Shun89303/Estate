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
import { MOCK_ROOM_RENT, RoomRentProperty } from "@/mock/roomRent";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import MediaCarousel from "@/components/common/utils/MediaCarousel";
import NotFound from "@/components/common/state/NotFound";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import {
	Calendar,
	Users,
	Shield,
	MessageCircle,
	Coins,
	MapPin,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";
import { formatPrice } from "@/utils/formatPrice";
import { maskPhoneNumber } from "@/utils/maskPhoneNumber";
import { SavedItem } from "@/stores/savedPropertiesStore";

export default function RoomRentDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<RoomRentProperty | null>(null);
	const colors = useTheme();

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

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.images}
					videos={property.media.videos}
					onShare={() => console.log("Share")}
					savedItem={savedItem}
				/>

				{/* PROPERTY INFO */}
				<View style={styles.section}>
					<View style={styles.infoRow}>
						<View
							style={[
								styles.typePill,
								{ backgroundColor: colors.secondaryMute },
							]}
						>
							<SmallTitle style={{ color: colors.primaryGold }}>
								{property.propertyType}
							</SmallTitle>
						</View>
						{property.isNew && (
							<SmallTitle
								style={{ color: colors.primaryRed, fontWeight: "bold" }}
							>
								NEW
							</SmallTitle>
						)}
						<BodyText
							style={{ color: colors.textSecondary, marginLeft: "auto" }}
						>
							{property.uniqueCode}
						</BodyText>
					</View>

					<NormalTitle style={styles.title}>{property.title}</NormalTitle>

					{/* Address with pin */}
					<View style={styles.locationRow}>
						<MapPin size={14} color={colors.primaryGold} />
						<BodyText style={styles.location}>
							{property.location.address}
						</BodyText>
					</View>

					{/* Combined Price & Available container */}
					<View style={[styles.combinedBox, { backgroundColor: "#fff" }]}>
						{/* Price part */}
						<View style={styles.priceInnerBox}>
							<View style={{ flex: 1 }}>
								<PageTitle
									style={{
										marginBottom: 0,
										fontSize: 20,
										color: colors.primaryGold,
									}}
								>
									฿{formatPrice(property.price.rent)}/mo
								</PageTitle>
								<BodyText style={styles.priceSubtitle}>per month</BodyText>
							</View>
							<View style={{ flex: 1 }}>
								<NormalTitle style={styles.priceTitle}>
									Deposit: ฿{formatPrice(property.price.deposit)}
								</NormalTitle>
								<BodyText style={styles.priceSubtitle}>
									Min {property.price.minContractMonths} months contract
								</BodyText>
							</View>
						</View>

						{/* Available from */}
						<View style={styles.availableRow}>
							<Calendar size={14} color={colors.primaryGold} />
							<BodyText>
								Available from: {property.price.availableFrom}
							</BodyText>
						</View>
					</View>

					{/* Roommate Info Box */}
					{property.roommateInfo && (
						<View style={[styles.infoBox, { backgroundColor: "#fff" }]}>
							<NormalTitle style={styles.infoTitle}>Roommate Info</NormalTitle>
							<View style={styles.roommateRow}>
								<Users size={16} color={colors.primaryGold} />
								<BodyText>
									{property.roommateInfo.occupiedSpots} of{" "}
									{property.roommateInfo.totalSpots} spots taken
								</BodyText>
								{property.roommateInfo.preferences && (
									<View
										style={[
											styles.preferencePill,
											{ backgroundColor: colors.secondaryMute },
										]}
									>
										<BodyText style={{ color: colors.primaryGold }}>
											{property.roommateInfo.preferences}
										</BodyText>
									</View>
								)}
							</View>
						</View>
					)}

					{/* Amenities */}
					<View style={styles.simpleBox}>
						<NormalTitle style={styles.infoTitle}>Amenities</NormalTitle>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.amenitiesRow}
						>
							{Object.keys(property.amenities)
								.filter((k) => property.amenities[k])
								.map((amenity, idx) => (
									<View
										key={idx}
										style={[
											styles.amenityPill,
											{ backgroundColor: colors.secondaryMute },
										]}
									>
										<BodyText style={{ color: colors.textPrimary }}>
											{amenity}
										</BodyText>
									</View>
								))}
						</ScrollView>
					</View>

					{/* House Rules (column with icons) */}
					<View style={styles.simpleBox}>
						<NormalTitle style={styles.infoTitle}>House Rules</NormalTitle>
						{Object.keys(property.houseRules)
							.filter((k) => property.houseRules[k])
							.map((rule, idx) => (
								<View key={idx} style={styles.ruleRow}>
									<Shield size={14} color={colors.primaryGold} />
									<BodyText>{rule}</BodyText>
								</View>
							))}
					</View>

					{/* About */}
					{property.description && (
						<View style={styles.simpleBox}>
							<NormalTitle style={styles.infoTitle}>About</NormalTitle>
							<BodyText>{property.description}</BodyText>
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

					{/* Agent Box */}
					<View style={[styles.agentBox, { backgroundColor: "#fff" }]}>
						<Image
							source={{ uri: property.agent.profileImage }}
							style={styles.agentImage}
						/>
						<View style={styles.agentInfo}>
							<NormalTitle style={styles.agentName}>
								{property.agent.name}
							</NormalTitle>
							<BodyText>{maskPhoneNumber(property.agent.phone)}</BodyText>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* BOTTOM CTA */}
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
								uniqueCode: property.uniqueCode,
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
						Reserve {property.reserveCoins} coins
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
		marginBottom: 4,
	},
	location: { fontSize: 14, flexShrink: 1 },
	combinedBox: {
		borderRadius: 16,
		...globalStyles.shadows,
	},
	priceInnerBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	priceTitle: { fontWeight: "600", marginBottom: 2 },
	priceSubtitle: { fontSize: 12 },
	availableRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		padding: 12,
	},
	infoBox: {
		padding: 16,
		borderRadius: 16,
		gap: 8,
		...globalStyles.shadows,
	},
	roommateRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 8,
	},
	preferencePill: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
	},
	simpleBox: {
		gap: 8,
	},
	infoTitle: { fontWeight: "600", fontSize: 18, marginBottom: 4 },
	ruleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginVertical: 2,
	},
	agentBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		padding: 16,
		borderRadius: 16,
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
	amenitiesRow: {
		flexDirection: "row",
		gap: 8,
	},
	amenityPill: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		marginRight: 8,
	},
});
