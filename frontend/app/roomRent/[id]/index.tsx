import { useState } from "react";
import {
	View,
	Text,
	Pressable,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Video } from "expo-av";
import { MOCK_ROOM_RENT, RoomRentProperty } from "@/mock/roomRent";

export default function RoomRentDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const property: RoomRentProperty | undefined = MOCK_ROOM_RENT.find(
		(r) => r.id.toString() === id,
	);

	const [activeMediaIndex, setActiveMediaIndex] = useState(0);

	if (!property) return <Text>Property not found</Text>;

	const mediaItems = [
		property.media.cover,
		...property.media.images,
		...property.media.videos,
	];
	const isVideo = (index: number) => index === mediaItems.length - 1;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* HEADER */}
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} />
				</Pressable>
				<View style={{ flexDirection: "row", gap: 16 }}>
					<Ionicons name="share-social-outline" size={24} />
					<Ionicons name="heart-outline" size={24} />
				</View>
			</View>

			<ScrollView style={{ flex: 1 }}>
				{/* MEDIA CAROUSEL */}
				<View style={styles.carouselContainer}>
					{isVideo(activeMediaIndex) ? (
						<Video
							source={{ uri: mediaItems[activeMediaIndex] }}
							style={styles.carouselImage}
							useNativeControls
						/>
					) : (
						<Image
							source={{ uri: mediaItems[activeMediaIndex] }}
							style={styles.carouselImage}
							resizeMode="contain"
						/>
					)}

					{/* MEDIA NAVIGATION */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.mediaNav}
					>
						{mediaItems.map((item, idx) => (
							<TouchableOpacity
								key={idx}
								onPress={() => setActiveMediaIndex(idx)}
								style={[
									styles.mediaThumb,
									activeMediaIndex === idx && styles.activeMediaThumb,
								]}
							>
								<Image
									source={{ uri: item }}
									style={{ width: 50, height: 50, borderRadius: 4 }}
								/>
								{isVideo(idx) && (
									<Ionicons
										name="play-circle"
										size={20}
										color="white"
										style={{ position: "absolute", top: 15, left: 15 }}
									/>
								)}
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

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
						<MapView
							style={{ flex: 1 }}
							initialRegion={{
								latitude: property.location.latitude,
								longitude: property.location.longitude,
								latitudeDelta: 0.01,
								longitudeDelta: 0.01,
							}}
						>
							<Marker
								coordinate={{
									latitude: property.location.latitude,
									longitude: property.location.longitude,
								}}
								title={property.title}
								description={property.location.address}
							/>
						</MapView>
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
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
		alignItems: "center",
	},
	carouselContainer: { width: "100%", height: 250 },
	carouselImage: { width: "100%", height: "100%" },
	mediaNav: { position: "absolute", bottom: 8, left: 16, flexDirection: "row" },
	mediaThumb: { marginRight: 8, borderWidth: 1, borderColor: "#ccc" },
	activeMediaThumb: { borderColor: "#333", borderWidth: 2 },
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
