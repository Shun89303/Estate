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
import { MOCK_OFFPLAN, OffPlanProperty, UnitType } from "@/mock/offPlan";

export default function OffPlanDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const [unitFilter, setUnitFilter] = useState<string>("All");

	const property: OffPlanProperty | undefined = MOCK_OFFPLAN.find(
		(p) => p.id.toString() === id,
	);

	const [activeMediaIndex, setActiveMediaIndex] = useState(0);
	const [activeTab, setActiveTab] = useState<"Units" | "Payment" | "Trust">(
		"Units",
	);
	const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);

	if (!property) return <Text>Not found</Text>;

	const mediaItems = [
		property.media.cover,
		...property.media.images,
		...property.media.videos,
	];

	const isVideo = (index: number) => index === mediaItems.length - 1;

	const availableUnitsCount = property.units.filter(
		(u) => u.status === "Available",
	).length;

	const paymentCalculated =
		selectedUnit &&
		property.paymentPlan.calculateAmounts(selectedUnit.priceTotal);

	const unitTypes = Array.from(new Set(property.units.map((u) => u.type)));

	const filteredUnits =
		unitFilter === "All"
			? property.units
			: property.units.filter((u) => u.type === unitFilter);

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

			<ScrollView>
				{/* CAROUSEL */}
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
						/>
					)}

					{/* OVERLAY */}
					<View style={styles.overlay}>
						<Text style={styles.badge}>OFF-PLAN</Text>
						<Text>{property.uniqueCode}</Text>
						<Text style={styles.overlayTitle}>{property.title}</Text>
						<Text style={styles.overlaySub}>{property.developerName}</Text>
					</View>

					{/* NAVIGATOR */}
					<ScrollView horizontal style={styles.mediaNav}>
						{mediaItems.map((item, idx) => (
							<TouchableOpacity
								key={idx}
								onPress={() => setActiveMediaIndex(idx)}
								style={[
									styles.thumb,
									activeMediaIndex === idx && styles.activeThumb,
								]}
							>
								<Image
									source={{ uri: item }}
									style={{ width: 50, height: 50 }}
								/>
								{isVideo(idx) && (
									<Ionicons
										name="play-circle"
										size={18}
										color="#fff"
										style={styles.playIcon}
									/>
								)}
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* STATS */}
				<View style={styles.sectionRow}>
					{[
						["📈", property.rentalYield, "Rental Yield"],
						["📊", property.annualGrowth, "Annual Growth"],
						["🏢", property.unitsLeft, "Units Left"],
					].map(([icon, val, label], i) => (
						<View key={i} style={styles.statCol}>
							<Text>{icon}</Text>
							<Text>{val}</Text>
							<Text style={styles.sub}>{label}</Text>
						</View>
					))}
				</View>

				{/* PRICE BOX */}
				<View style={styles.box}>
					<Text>Starting from</Text>
					<Text style={styles.bold}>{property.priceRange}</Text>
					<Text>Completion: {property.completionDate}</Text>
					<Text>{property.locationAddress}</Text>
				</View>

				{/* TOGGLES */}
				<View style={styles.toggleRow}>
					{[
						["Units", `Units (${availableUnitsCount})`],
						["Payment", "Payment Plan"],
						["Trust", "Trust & Safety"],
					].map(([key, label]) => (
						<Pressable key={key} onPress={() => setActiveTab(key as any)}>
							<Text style={activeTab === key ? styles.activeTab : styles.tab}>
								{label}
							</Text>
						</Pressable>
					))}
				</View>

				{/* TAB CONTENT */}
				{activeTab === "Units" && (
					<View style={{ padding: 16 }}>
						{/* FILTERS */}
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ marginBottom: 12 }}
						>
							{["All", ...unitTypes].map((type) => (
								<Pressable
									key={type}
									onPress={() => {
										setUnitFilter(type);
										setSelectedUnit(null); // reset selection
									}}
									style={{
										paddingHorizontal: 12,
										paddingVertical: 6,
										marginRight: 8,
										borderRadius: 16,
										backgroundColor: unitFilter === type ? "#333" : "#eee",
									}}
								>
									<Text
										style={{
											color: unitFilter === type ? "#fff" : "#333",
											fontSize: 12,
										}}
									>
										{type}
									</Text>
								</Pressable>
							))}
						</ScrollView>

						{/* UNIT LIST */}
						{filteredUnits.map((u, i) => {
							const isSelected = selectedUnit?.priceTotal === u.priceTotal;

							return (
								<Pressable
									key={i}
									onPress={() => {
										setSelectedUnit(u);
									}}
									style={[
										styles.unitCard,
										isSelected && styles.unitCardSelected,
									]}
								>
									<View>
										<Text>
											{u.type} • {u.status}
										</Text>
										<Text>Floor {u.floor}</Text>
										<Text>
											{u.areaSqm} sqm • {u.bedrooms || 0} bd • {u.bathrooms} ba
										</Text>
									</View>

									<View style={{ alignItems: "flex-end" }}>
										<Text style={styles.bold}>
											฿{u.priceTotal.toLocaleString()}
										</Text>
										<Text style={{ fontSize: 12, color: "#666" }}>
											฿{u.pricePerSqm.toLocaleString()}/sqm
										</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
				)}

				{activeTab === "Payment" && (
					<View style={styles.box}>
						<Text style={styles.bold}>Payment Schedule</Text>

						{/* ORIGINAL PLAN */}
						{property.paymentPlan.steps.map((s, i) => (
							<View key={i} style={styles.row}>
								<Text>{s.name}</Text>
								<Text>{s.percentage}%</Text>
							</View>
						))}

						{/* DIVIDER */}
						{selectedUnit && <View style={styles.divider} />}

						{/* CALCULATED RESULT */}
						{selectedUnit && (
							<>
								<Text style={[styles.bold, { marginBottom: 8 }]}>
									For {selectedUnit.type} ( ฿
									{selectedUnit.priceTotal.toLocaleString()})
								</Text>

								{paymentCalculated?.map((s, i) => (
									<View key={i} style={styles.row}>
										<Text>{s.name}</Text>
										<Text>฿{s.amount?.toLocaleString()}</Text>
									</View>
								))}
							</>
						)}
					</View>
				)}

				{activeTab === "Trust" && (
					<View style={{ padding: 16 }}>
						<View style={styles.box}>
							<Image
								source={{ uri: property.developer.image }}
								style={styles.devImg}
							/>
							<Text>{property.developer.name}</Text>
							<Text>
								{property.developer.establishedYear} •{" "}
								{property.developer.projectsCompleted} projects
							</Text>
							<Text>{property.developer.bio}</Text>
						</View>

						<View style={styles.box}>
							<Text style={styles.bold}>Buyer Protection</Text>
							{property.developer.buyerProtection.map((b, i) => (
								<Text key={i}>{b}</Text>
							))}
						</View>
					</View>
				)}

				{/* FEATURES */}
				<View style={styles.section}>
					<Text style={styles.bold}>Project Features</Text>
					{Object.keys(property.features)
						.filter((k) => property.features[k])
						.map((k) => (
							<Text key={k}>{k}</Text>
						))}
				</View>

				{/* ABOUT */}
				<View style={styles.section}>
					<Text style={styles.bold}>About</Text>
					<Text>{property.about}</Text>
				</View>

				{/* LANDMARKS */}
				<View style={styles.section}>
					<Text style={styles.bold}>Nearby</Text>
					{property.nearbyLandmarks.map((l, i) => (
						<Text key={i}>{l}</Text>
					))}
				</View>

				{/* MAP */}
				<View style={{ height: 200, margin: 16 }}>
					<MapView
						style={{ flex: 1 }}
						initialRegion={{
							latitude: property.latitude,
							longitude: property.longitude,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01,
						}}
					>
						<Marker
							coordinate={{
								latitude: property.latitude,
								longitude: property.longitude,
							}}
						/>
					</MapView>
				</View>
			</ScrollView>

			{/* CTA */}
			<View style={styles.ctaContainer}>
				<View style={{ flexDirection: "row", gap: 8 }}>
					<Pressable style={styles.cta}>
						<Text>Calculator</Text>
					</Pressable>
					<Pressable style={styles.cta}>
						<Text>AI Advisor</Text>
					</Pressable>
				</View>
				<Pressable
					style={[
						{
							marginTop: 8,
							padding: 12,
							backgroundColor: "#ddd",
							alignItems: "center",
							borderRadius: 8,
						},
					]}
				>
					<Text style={{ fontSize: 15, fontWeight: "500" }}>
						Book Free Consultation
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	carouselContainer: { height: 250 },
	carouselImage: { width: "100%", height: "100%" },
	overlay: { position: "absolute", bottom: 60, left: 16 },
	badge: { backgroundColor: "red", color: "#fff", padding: 4 },
	overlayTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
	overlaySub: { color: "#fff" },
	mediaNav: { position: "absolute", bottom: 8, left: 16 },
	thumb: { marginRight: 8 },
	activeThumb: { borderWidth: 2 },
	playIcon: { position: "absolute", top: 15, left: 15 },
	sectionRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 16,
	},
	statCol: { alignItems: "center" },
	sub: { fontSize: 12, color: "#777" },
	box: { padding: 16, margin: 16, backgroundColor: "#eee", borderRadius: 8 },
	toggleRow: { flexDirection: "row", gap: 16, padding: 16 },
	tab: { color: "#777" },
	activeTab: { fontWeight: "bold" },
	unitCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
		padding: 12,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
	},
	unitCardSelected: {
		borderColor: "#007bff",
		backgroundColor: "#eef5ff",
	},
	row: { flexDirection: "row", justifyContent: "space-between" },
	section: { padding: 16 },
	bold: { fontWeight: "bold" },
	devImg: { width: 50, height: 50, borderRadius: 25 },
	ctaContainer: { padding: 16 },
	cta: {
		flex: 1,
		padding: 12,
		backgroundColor: "#ddd",
		alignItems: "center",
		borderRadius: 8,
	},
	divider: {
		height: 1,
		backgroundColor: "#ccc",
		marginVertical: 12,
	},
});
