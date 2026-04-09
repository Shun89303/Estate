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
import { MOCK_ROOM_RENT, RoomRentProperty } from "@/mock/roomRent";
import { PropertyMap } from "@/components/common/PropertyMap";
import MediaCarousel from "@/components/common/MediaCarousel";

export default function RoomRentDetails() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const property: RoomRentProperty | undefined = MOCK_ROOM_RENT.find(
		(r) => r.id.toString() === id,
	);

	if (!property) return <Text>Property not found</Text>;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				{/* Reusable Media Carousel */}
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.images}
					videos={property.media.videos}
					onLike={() => console.log("Like")}
					onShare={() => console.log("Share")}
				/>

				{/* PROPERTY INFO */}
				<View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
						<Text style={styles.propertyType}>{property.propertyType}</Text>
						{property.isNew && <Text style={styles.newBadge}>NEW</Text>}
						<Text>{property.uniqueCode}</Text>
					</View>

					<Text style={styles.title}>{property.title}</Text>
					<Text style={styles.location}>{property.location.address}</Text>

					{/* Price Box */}
					<View style={styles.priceBox}>
						<View style={{ flex: 1 }}>
							<Text style={styles.priceTitle}>฿{property.price.rent}/mo</Text>
							<Text style={styles.priceSubtitle}>per month</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.priceTitle}>
								Deposit: ฿{property.price.deposit}
							</Text>
							<Text style={styles.priceSubtitle}>
								Min {property.price.minContractMonths} months contract
							</Text>
						</View>
					</View>
					<Text style={{ marginVertical: 4 }}>
						Available from: {property.price.availableFrom}
					</Text>

					{/* Roommate Info */}
					{property.roommateInfo && (
						<View style={styles.infoBox}>
							<Text style={styles.infoTitle}>Roommate Info</Text>
							<Text>
								{property.roommateInfo.occupiedSpots} of{" "}
								{property.roommateInfo.totalSpots} spots taken{" "}
								{property.roommateInfo.preferences || ""}
							</Text>
						</View>
					)}

					{/* Amenities */}
					<View style={styles.infoBox}>
						<Text style={styles.infoTitle}>Amenities</Text>
						<Text>
							{Object.keys(property.amenities)
								.filter((k) => property.amenities[k])
								.join(", ")}
						</Text>
					</View>

					{/* House Rules */}
					<View style={styles.infoBox}>
						<Text style={styles.infoTitle}>House Rules</Text>
						<Text>
							{Object.keys(property.houseRules)
								.filter((k) => property.houseRules[k])
								.join(", ")}
						</Text>
					</View>

					{/* About */}
					{property.description && (
						<View style={styles.infoBox}>
							<Text style={styles.infoTitle}>About</Text>
							<Text>{property.description}</Text>
						</View>
					)}

					{/* Map */}
					<View style={{ height: 200, marginVertical: 8 }}>
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

					{/* Agent */}
					<View style={styles.agentBox}>
						<Image
							source={{ uri: property.agent.profileImage }}
							style={styles.agentImage}
						/>
						<View>
							<Text style={styles.agentName}>{property.agent.name}</Text>
							<Text>{property.agent.phone}</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* BOTTOM CTA */}
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
	propertyType: { fontSize: 12, fontWeight: "500", color: "#555" },
	newBadge: {
		fontSize: 10,
		color: "#fff",
		backgroundColor: "red",
		paddingHorizontal: 4,
	},
	title: { fontSize: 16, fontWeight: "600", marginVertical: 4 },
	location: { fontSize: 12, color: "#777", marginBottom: 8 },
	priceBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	priceTitle: { fontWeight: "600" },
	priceSubtitle: { fontSize: 12, color: "#555" },
	infoBox: { marginVertical: 8 },
	infoTitle: { fontWeight: "600", marginBottom: 2 },
	agentBox: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
		marginVertical: 8,
	},
	agentImage: { width: 50, height: 50, borderRadius: 25 },
	agentName: { fontWeight: "600" },
	ctaRow: {
		flexDirection: "row",
		padding: 16,
		gap: 12,
		borderTopWidth: 1,
		borderColor: "#ddd",
	},
	ctaBtn: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
});
