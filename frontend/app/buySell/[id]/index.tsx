import { useEffect, useState } from "react";
import {
	View,
	Text,
	Pressable,
	ScrollView,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { Video } from "expo-av";
import { MOCK_BUYSELL, Property } from "@/mock/buySell";
import { Ionicons } from "@expo/vector-icons";

export default function BuySellDetails() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const [activeMediaIndex, setActiveMediaIndex] = useState(0);
	const router = useRouter();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_BUYSELL.find((p) => p.id?.toString() === id.toString());
		setProperty(found || null);
	}, [id]);

	if (!property)
		return (
			<SafeAreaView>
				<Pressable onPress={() => router.back()}>
					<Text style={{ fontSize: 12, fontWeight: "500" }}>Back</Text>
				</Pressable>
				<Text style={{ padding: 16 }}>Loading property...</Text>
			</SafeAreaView>
		);

	const mediaItems = [
		property.media.cover,
		...property.media.images,
		...property.media.videos,
	];
	const isVideo = (index: number) =>
		index >= mediaItems.length - property.media.videos.length;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{/* Top buttons */}
				<View style={styles.topButtons}>
					<Pressable onPress={() => router.back()} style={styles.topButton}>
						<Text>Back</Text>
					</Pressable>
					<View style={{ flexDirection: "row", gap: 12 }}>
						<Pressable style={styles.topButton}>
							<Text>♡</Text>
						</Pressable>
						<Pressable style={styles.topButton}>
							<Text>Share</Text>
						</Pressable>
					</View>
				</View>

				{/* MEDIA CAROUSEL */}
				<View style={styles.carouselContainer}>
					{isVideo(activeMediaIndex) ? (
						<Video
							source={{ uri: mediaItems[activeMediaIndex] }}
							style={styles.carouselImage}
							useNativeControls
							isLooping
						/>
					) : (
						<Image
							source={{ uri: mediaItems[activeMediaIndex] }}
							style={styles.carouselImage}
							resizeMode="cover"
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

				{/* MEDIA NAVIGATOR */}
				<View style={styles.mediaNavigator}>
					{mediaItems.map((_, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => setActiveMediaIndex(index)}
							style={[
								styles.navigatorItem,
								activeMediaIndex === index && styles.navigatorItemActive,
							]}
						/>
					))}
				</View>

				{/* PROPERTY INFO */}
				<View style={styles.section}>
					{/* Price */}
					<View style={styles.priceContainer}>
						<Text style={styles.price}>฿{property.price.toLocaleString()}</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
						<Text>{property.type}</Text>
						{property.isNew && <Text style={styles.newBadge}>NEW</Text>}
						<Text>{property.uniqueCode}</Text>
					</View>

					<Text style={styles.title}>{property.title}</Text>
					<Text style={styles.address}>{property.location.address}</Text>

					{/* Specs */}
					<View style={styles.specsRow}>
						<Text style={styles.spec}>{property.bedrooms} bd</Text>
						<Text style={styles.spec}>{property.bathrooms} ba</Text>
						<Text style={styles.spec}>{property.areaSqm} m²</Text>
						<Text style={styles.spec}>
							Floor {property.floor}/{property.totalFloors}
						</Text>
					</View>
				</View>

				{/* FEATURES */}
				{Object.keys(property.features).length > 0 && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Features</Text>
						<View style={styles.featuresGrid}>
							{Object.entries(property.features).map(
								([key, val]) =>
									val && (
										<View key={key} style={styles.featureItem}>
											<Text>{key}</Text>
										</View>
									),
							)}
						</View>
					</View>
				)}

				{/* ABOUT */}
				{property.description && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>About</Text>
						<Text>{property.description}</Text>
					</View>
				)}

				{/* MAP */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Location</Text>
					<MapView
						style={styles.map}
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

				{/* AGENT */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Property Agent</Text>
					<View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
						{property.agent.image && (
							<Image
								source={{ uri: property.agent.image }}
								style={{ width: 50, height: 50, borderRadius: 25 }}
							/>
						)}
						<View>
							<Text>{property.agent.name}</Text>
							<Text>{property.agent.experienceYears} years experience</Text>
							<Text>
								⭐ {property.agent.rating} • {"("}
								{property.agent.reviewCount}
								{")"}
							</Text>
						</View>
					</View>
				</View>

				{/* CONSULTATION FEE */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Agent Consultation Fee</Text>
					<Text style={styles.consultationFee}>
						{property.agent.consultationFee.toLocaleString()} MMK
					</Text>
					<Text style={{ fontSize: 12, color: "#666" }}>
						✦ Free consultation — Limited Offer
					</Text>
				</View>

				{/* CTA BUTTONS */}
				<View style={styles.ctaRow}>
					<Pressable style={styles.ctaButton}>
						<Text style={styles.ctaText}>Consultation</Text>
					</Pressable>
					<Pressable style={styles.ctaButton}>
						<Text style={styles.ctaText}>
							Reserve {property.reserveCoins} Coins
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	topButtons: {
		paddingHorizontal: 16,
		paddingTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	topButton: { padding: 6 },
	carouselContainer: { width: "100%", height: 250 },
	carouselImage: { width: "100%", height: "100%" },
	mediaNav: { position: "absolute", bottom: 8, left: 16, flexDirection: "row" },
	mediaThumb: { marginRight: 8, borderWidth: 1, borderColor: "#ccc" },
	activeMediaThumb: { borderColor: "#333", borderWidth: 2 },
	mediaNavigator: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 8,
		gap: 6,
	},
	navigatorItem: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#ccc",
	},
	navigatorItemActive: { backgroundColor: "#007bff" },
	section: { marginTop: 16, paddingHorizontal: 16 },
	sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
	newBadge: {
		backgroundColor: "#007bff",
		color: "#fff",
		paddingHorizontal: 6,
		borderRadius: 4,
	},
	title: { fontSize: 18, fontWeight: "bold", marginVertical: 4 },
	address: { fontSize: 14, color: "#666", marginBottom: 8 },
	specsRow: { flexDirection: "row", gap: 12, marginBottom: 8 },
	spec: { fontSize: 12, color: "#555" },
	priceContainer: { marginVertical: 8 },
	price: { fontSize: 16, fontWeight: "bold" },
	featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
	featureItem: { backgroundColor: "#eee", padding: 6, borderRadius: 6 },
	map: { height: 200, borderRadius: 12 },
	ctaRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	ctaButton: {
		flex: 1,
		backgroundColor: "#007bff",
		padding: 12,
		marginHorizontal: 4,
		borderRadius: 8,
	},
	ctaText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
	consultationFee: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
});
