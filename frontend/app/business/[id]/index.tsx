import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { MOCK_BUSINESS, BusinessProperty } from "@/mock/business";
import { PropertyMap } from "@/components/common/PropertyMap";
import MediaCarousel from "@/components/common/MediaCarousel";

export default function BusinessDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const property: BusinessProperty | undefined = MOCK_BUSINESS.find(
		(p) => p.id.toString() === id,
	);

	if (!property) return <Text style={styles.notFound}>Property not found</Text>;

	// Format pricing display
	const pricingUnit = property.pricing.type === "MONTHLY" ? "mo" : "day";
	const formattedPrice = `฿${property.pricing.amount.toLocaleString()}/${pricingUnit}`;

	// Get amenities list (keys with true value)
	const amenitiesList = Object.entries(property.amenities)
		.filter(([, value]) => value === true)
		.map(([key]) => key);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.photos}
					videos={property.media.videos}
					onLike={() => console.log("Like")}
					onShare={() => console.log("Share")}
				/>

				{/* Property Info */}
				<View style={styles.infoContainer}>
					{/* Type */}
					<Text style={styles.propertyType}>
						{property.type.replace("_", " ")}
					</Text>

					<Text>{property.uniqueCode}</Text>

					{/* Title */}
					<Text style={styles.title}>{property.title}</Text>

					{/* Address */}
					<Text style={styles.location}>{property.location.address}</Text>

					{/* Price & Deposit Box */}
					<View style={styles.priceBox}>
						<View style={{ flex: 1 }}>
							<Text style={styles.priceTitle}>{formattedPrice}</Text>
							<Text style={styles.priceSubtitle}>per {pricingUnit}</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.priceTitle}>
								Deposit: ฿{property.pricing.deposit.toLocaleString()}
							</Text>
							<Text style={styles.priceSubtitle}>
								Min {property.minLeaseMonths} months
							</Text>
						</View>
					</View>

					{/* Area & Capacity */}
					<View style={styles.rowDetails}>
						<Text>📐 {property.areaSqm} sqm</Text>
						<Text>👥 {property.capacity} people</Text>
					</View>

					{/* Amenities */}
					{amenitiesList.length > 0 && (
						<View style={styles.infoBox}>
							<Text style={styles.infoTitle}>Amenities</Text>
							<Text>{amenitiesList.join(", ")}</Text>
						</View>
					)}

					{/* About */}
					{property.about && (
						<View style={styles.infoBox}>
							<Text style={styles.infoTitle}>About</Text>
							<Text>{property.about}</Text>
						</View>
					)}

					{/* Map */}
					<View style={styles.mapContainer}>
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
					<View style={styles.agentBox}>
						<Image
							source={{ uri: property.contact.profileImage }}
							style={styles.agentImage}
						/>
						<View>
							<Text style={styles.agentName}>{property.contact.name}</Text>
							<Text>{property.contact.phone}</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Bottom CTA Buttons */}
			<View style={styles.ctaRow}>
				<TouchableOpacity
					style={[styles.ctaBtn, { backgroundColor: "#333" }]}
					onPress={() => {}}
				>
					<Text style={{ color: "#fff" }}>Consultation</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.ctaBtn, { backgroundColor: "#f0ad4e" }]}
					onPress={() => {}}
				>
					<Text>Reserve {property.reserveCoins} coins</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	notFound: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.9)",
	},
	carouselContainer: {
		width: "100%",
		height: 250,
		marginTop: 44, // space for header
	},
	carouselImage: {
		width: "100%",
		height: "100%",
	},
	mediaNav: {
		position: "absolute",
		bottom: 8,
		left: 16,
		flexDirection: "row",
	},
	mediaThumb: {
		marginRight: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		overflow: "hidden",
	},
	activeMediaThumb: {
		borderColor: "#333",
		borderWidth: 2,
	},
	playIcon: {
		position: "absolute",
		top: 15,
		left: 15,
	},
	infoContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	propertyType: {
		fontSize: 12,
		fontWeight: "500",
		color: "#555",
		marginBottom: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 4,
	},
	location: {
		fontSize: 14,
		color: "#777",
		marginBottom: 12,
	},
	priceBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#f8f8f8",
		padding: 12,
		borderRadius: 8,
		marginVertical: 8,
	},
	priceTitle: {
		fontWeight: "600",
		fontSize: 16,
	},
	priceSubtitle: {
		fontSize: 12,
		color: "#555",
		marginTop: 2,
	},
	rowDetails: {
		flexDirection: "row",
		gap: 24,
		marginVertical: 8,
	},
	infoBox: {
		marginVertical: 8,
	},
	infoTitle: {
		fontWeight: "600",
		marginBottom: 4,
		fontSize: 16,
	},
	mapContainer: {
		height: 200,
		marginVertical: 12,
		borderRadius: 12,
		overflow: "hidden",
	},
	map: {
		flex: 1,
	},
	agentBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginVertical: 12,
		padding: 8,
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
	},
	agentImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	agentName: {
		fontWeight: "600",
		fontSize: 16,
	},
	ctaRow: {
		flexDirection: "row",
		padding: 16,
		gap: 12,
		borderTopWidth: 1,
		borderColor: "#eee",
		backgroundColor: "#fff",
	},
	ctaBtn: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 30,
		alignItems: "center",
	},
});
