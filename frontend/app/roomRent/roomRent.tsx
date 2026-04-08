import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	Image,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MOCK_ROOM_RENT, RoomRentProperty } from "@/mock/roomRent";
import { PropertyMap } from "@/components/common/PropertyMap";
import FilterSection from "@/components/common/FilterSection";

const PROPERTY_TYPES = [
	"All",
	"SINGLE ROOM",
	"SHARED ROOM",
	"MASTER ROOM",
	"STUDIO",
];
const LOCATIONS = ["All", "Thonglor", "Bangna", "Rama 9", "Sukhumvit"];
const PRICE_RANGES = ["Any", "<฿5K", "฿5-8K", "฿8-12K", "฿12K+"];

export default function RoomRent() {
	const router = useRouter();
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	const [searchText, setSearchText] = useState("");
	const [activeType, setActiveType] = useState("All");
	const [showFilters, setShowFilters] = useState(false);
	const [activeLocation, setActiveLocation] = useState("All");
	const [activePrice, setActivePrice] = useState("Any");

	const filteredRooms = MOCK_ROOM_RENT.filter((r) => {
		const matchesSearch = r.title
			.toLowerCase()
			.includes(searchText.toLowerCase());
		const matchesType = activeType === "All" || r.propertyType === activeType;
		const matchesLocation =
			activeLocation === "All" || r.location.address.includes(activeLocation);
		const matchesPrice =
			activePrice === "Any" ||
			(activePrice === "<฿5K" && r.price.rent < 5000) ||
			(activePrice === "฿5-8K" &&
				r.price.rent >= 5000 &&
				r.price.rent <= 8000) ||
			(activePrice === "฿8-12K" &&
				r.price.rent > 8000 &&
				r.price.rent <= 12000) ||
			(activePrice === "฿12K+" && r.price.rent > 12000);

		return matchesSearch && matchesType && matchesLocation && matchesPrice;
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text style={styles.backBtn}>Back</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Room Renting</Text>
				<TouchableOpacity onPress={() => setShowFilters((prev) => !prev)}>
					<Ionicons name="filter" size={24} color="#333" />
				</TouchableOpacity>
			</View>

			<View style={styles.searchContainer}>
				<TextInput
					placeholder="Search rooms..."
					value={searchText}
					onChangeText={setSearchText}
					style={styles.searchInput}
				/>
			</View>

			{/* Conditional Filters (Location & Price) */}
			{showFilters && (
				<View style={{ paddingHorizontal: 16, marginTop: 8 }}>
					<FilterSection
						title="Location"
						options={LOCATIONS}
						selected={activeLocation}
						onSelect={setActiveLocation}
					/>
					<FilterSection
						title="Price Range"
						options={PRICE_RANGES}
						selected={activePrice}
						onSelect={setActivePrice}
					/>
				</View>
			)}

			{/* Property Type Filter (always visible) */}
			<View style={{ paddingHorizontal: 16, marginTop: 8 }}>
				<FilterSection
					options={PROPERTY_TYPES}
					selected={activeType}
					onSelect={setActiveType}
				/>
			</View>

			<View style={styles.toggleRowWithCount}>
				<Text style={styles.totalCount}>
					{filteredRooms.length} rooms found
				</Text>
				<View style={styles.toggleRow}>
					<TouchableOpacity onPress={() => setViewMode("list")}>
						<Text style={viewMode === "list" ? styles.active : undefined}>
							List
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setViewMode("map")}>
						<Text style={viewMode === "map" ? styles.active : undefined}>
							Map
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{viewMode === "list" ? (
				<FlatList
					data={filteredRooms}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <RoomCard property={item} />}
				/>
			) : (
				<PropertyMap
					markers={filteredRooms.map((p) => ({
						id: p.id,
						latitude: p.location.latitude,
						longitude: p.location.longitude,
						title: p.title,
						description: p.location.address,
						onPress: () => router.push(`/roomRent/${p.id}`),
					}))}
					style={{ flex: 1 }}
				/>
			)}
		</SafeAreaView>
	);
}

function RoomCard({ property }: { property: RoomRentProperty }) {
	const router = useRouter();
	return (
		<TouchableOpacity onPress={() => router.push(`/roomRent/${property.id}`)}>
			<View style={styles.card}>
				{property.isNew && <Text style={styles.newBadge}>NEW</Text>}
				<Image
					source={{ uri: property.media.cover }}
					style={styles.cardImage}
					resizeMode="cover"
				/>
				<View style={styles.cardInfo}>
					<Text style={styles.propertyType}>{property.propertyType}</Text>
					<Text style={styles.propertyTitle}>{property.title}</Text>
					<Text style={styles.propertyLocation}>
						{property.location.address}
					</Text>
					{property.roommateInfo && (
						<Text style={styles.propertyDetails}>
							Roommates: {property.roommateInfo.occupiedSpots}/
							{property.roommateInfo.totalSpots}
						</Text>
					)}
					<Text style={styles.propertyDetails}>
						{property.price.minContractMonths} months min - ฿
						{property.price.rent}/mo
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	backBtn: { fontSize: 14, fontWeight: "500" },
	title: { fontSize: 16, fontWeight: "600" },
	searchContainer: { paddingHorizontal: 16, paddingVertical: 8 },
	searchInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 12,
		height: 40,
	},
	toggleRowWithCount: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	totalCount: { fontWeight: "bold" },
	toggleRow: { flexDirection: "row", gap: 16 },
	active: { fontWeight: "bold", textDecorationLine: "underline" },
	card: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		borderColor: "#ddd",
		alignItems: "center",
	},
	newBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "red",
		color: "#fff",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
		fontSize: 10,
		zIndex: 1,
	},
	cardImage: { width: 100, height: 80, borderRadius: 6 },
	cardInfo: { marginLeft: 12, flex: 1 },
	propertyType: { fontSize: 12, fontWeight: "500", color: "#555" },
	propertyTitle: { fontSize: 14, fontWeight: "600" },
	propertyLocation: { fontSize: 12, color: "#777", marginVertical: 2 },
	propertyDetails: { fontSize: 12, color: "#555" },
});
