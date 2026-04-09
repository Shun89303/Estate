import { useEffect, useState } from "react";
import {
	View,
	Text,
	Pressable,
	ScrollView,
	Image,
	StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_BUYSELL, Property } from "@/mock/buySell";
import { PropertyMap } from "@/components/common/PropertyMap";
import MediaCarousel from "@/components/common/MediaCarousel";
import NotFound from "@/components/common/NotFound";

export default function BuySellDetails() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_BUYSELL.find((p) => p.id?.toString() === id.toString());
		setProperty(found || null);
	}, [id]);

	if (!property) return <NotFound />;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.images}
					videos={property.media.videos}
					onLike={() => console.log("Like")}
					onShare={() => console.log("Share")}
					showBack={true}
					showLike={true}
					showShare={true}
				/>

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
					<Pressable
						style={styles.ctaButton}
						onPress={() => router.push("/booking")}
					>
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
	container: { flex: 1 },
	carouselContainer: {
		width: "100%",
		height: 250,
		position: "relative",
	},
	carouselImage: {
		width: "100%",
		height: "100%",
	},
	backButton: {
		position: "absolute",
		top: 12,
		left: 16,
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 10,
		zIndex: 10,
	},
	rightButtons: {
		position: "absolute",
		top: 12,
		right: 16,
		flexDirection: "row",
		gap: 12,
		zIndex: 10,
	},
	iconButton: {
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 10,
	},
	mediaCountBadge: {
		position: "absolute",
		bottom: 12,
		right: 12,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 99,
		zIndex: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	mediaCountText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "500",
	},
	mediaNav: {
		position: "absolute",
		bottom: 8,
		left: 16,
		flexDirection: "row",
	},
	playIconOverlay: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -10 }, { translateY: -10 }],
		backgroundColor: "rgba(0,0,0,0.6)",
		borderRadius: 12,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	playIconText: {
		color: "#fff",
		fontSize: 10,
	},
	mediaNavigatorInside: {
		position: "absolute",
		bottom: 12,
		left: 12,
		flexDirection: "row",
		gap: 6,
		zIndex: 10,
	},
	navigatorItem: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "rgba(255,255,255,0.6)",
	},
	navigatorItemActive: {
		backgroundColor: "#fff",
		width: 12,
		borderRadius: 6,
	},
	thumbnailStripOutside: {
		flexGrow: 0,
		marginVertical: 12,
		paddingHorizontal: 16,
	},
	thumbnailStripContent: {
		gap: 8,
	},
	mediaThumb: {
		marginRight: 0, // gap handles spacing
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		overflow: "hidden",
	},
	activeMediaThumb: {
		borderColor: "#007bff",
		borderWidth: 2,
	},
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
