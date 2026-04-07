import { useState, useMemo } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	StyleSheet,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import PropertyCard from "@/components/home/property/PropertyCard";
import { useRouter } from "expo-router";
import { MOCK_BUYSELL, Property } from "@/mock/buySell";

// Filter options
const PURPOSES = [
	"All",
	"For Investment",
	"For Living",
	"For Rent",
	"For Long Stay Visa",
];
const TYPES = ["All", "Condo", "House", "Townhouse", "Penthouse"];
const LOCATIONS = [
	"All",
	"Sukhumvit",
	"Thonglor",
	"Sathorn",
	"Bangna",
	"Rama 9",
	"Pattaya",
];
const PRICES = ["Any", "<฿5M", "฿5-10M", "฿10-20M", "฿20M+"];
const BEDROOMS = ["Any", "1+", "2+", "3+", "4+"];

// Helper: convert price string to min/max
const getPriceRange = (priceOption: string): [number, number] => {
	switch (priceOption) {
		case "<฿5M":
			return [0, 5_000_000];
		case "฿5-10M":
			return [5_000_000, 10_000_000];
		case "฿10-20M":
			return [10_000_000, 20_000_000];
		case "฿20M+":
			return [20_000_000, Infinity];
		default:
			return [0, Infinity];
	}
};

// Helper: convert bedrooms string to min bedrooms
const getBedroomsMin = (bedOption: string): number => {
	switch (bedOption) {
		case "1+":
			return 1;
		case "2+":
			return 2;
		case "3+":
			return 3;
		case "4+":
			return 4;
		default:
			return 0;
	}
};

// Map type string to PropertyType enum
const mapTypeToEnum = (typeStr: string): Property["type"] | null => {
	switch (typeStr) {
		case "Condo":
			return "CONDO";
		case "House":
			return "HOUSE";
		case "Townhouse":
			return "TOWNHOUSE";
		case "Penthouse":
			return "PENTHOUSE";
		default:
			return null;
	}
};

export default function Search() {
	const router = useRouter();
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	const [showFilters, setShowFilters] = useState(false);

	// Filter states
	const [selectedPurpose, setSelectedPurpose] = useState("All");
	const [selectedType, setSelectedType] = useState("All");
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedPrice, setSelectedPrice] = useState("Any");
	const [selectedBedrooms, setSelectedBedrooms] = useState("Any");

	// Check if any filter is active (non-default)
	const hasActiveFilters = useMemo(() => {
		return (
			selectedPurpose !== "All" ||
			selectedType !== "All" ||
			selectedLocation !== "All" ||
			selectedPrice !== "Any" ||
			selectedBedrooms !== "Any"
		);
	}, [
		selectedPurpose,
		selectedType,
		selectedLocation,
		selectedPrice,
		selectedBedrooms,
	]);

	const clearAllFilters = () => {
		setSelectedPurpose("All");
		setSelectedType("All");
		setSelectedLocation("All");
		setSelectedPrice("Any");
		setSelectedBedrooms("Any");
	};

	// Filter logic
	const filteredProperties = useMemo(() => {
		return MOCK_BUYSELL.filter((property) => {
			// Type filter
			if (selectedType !== "All") {
				const expectedType = mapTypeToEnum(selectedType);
				if (expectedType && property.type !== expectedType) return false;
			}

			// Location filter (case-insensitive partial match in address)
			if (selectedLocation !== "All") {
				const lowerAddress = property.location.address.toLowerCase();
				if (!lowerAddress.includes(selectedLocation.toLowerCase()))
					return false;
			}

			// Price filter
			const [minPrice, maxPrice] = getPriceRange(selectedPrice);
			if (property.price < minPrice || property.price > maxPrice) return false;

			// Bedrooms filter
			const minBed = getBedroomsMin(selectedBedrooms);
			if (property.bedrooms < minBed) return false;

			// Purpose filter – currently not implemented in data, so skip filtering
			return true;
		});
	}, [selectedType, selectedLocation, selectedPrice, selectedBedrooms]);

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"<"}</Text>
				</TouchableOpacity>

				<TextInput placeholder="Search..." style={styles.searchBar} />

				<TouchableOpacity onPress={() => setShowFilters((prev) => !prev)}>
					<Ionicons name="filter" size={24} color="#333" />
				</TouchableOpacity>
			</View>

			{/* CATEGORY ROW */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoryRow}
			>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/(tabs)/search")}
				>
					<Text style={{ fontSize: 15, fontWeight: "500" }}>Buy/Sell</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/roomRent/roomRent")}
				>
					<Text style={{ fontSize: 15, fontWeight: "500" }}>Room Rent</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/ownerDirect/ownerDirect")}
				>
					<Text style={{ fontSize: 15, fontWeight: "500" }}>Owner-Direct</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/offPlan/offPlan")}
				>
					<Text style={{ fontSize: 15, fontWeight: "500" }}>Off-Plan</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/business/business")}
				>
					<Text style={{ fontSize: 15, fontWeight: "500" }}>Business</Text>
				</TouchableOpacity>
			</ScrollView>

			{/* FILTERS */}
			{showFilters && (
				<View style={styles.filtersContainer}>
					<FilterSection
						title="Purpose"
						options={PURPOSES}
						selected={selectedPurpose}
						onSelect={setSelectedPurpose}
					/>
					<FilterSection
						title="Type"
						options={TYPES}
						selected={selectedType}
						onSelect={setSelectedType}
					/>
					<FilterSection
						title="Location"
						options={LOCATIONS}
						selected={selectedLocation}
						onSelect={setSelectedLocation}
					/>
					<FilterSection
						title="Price"
						options={PRICES}
						selected={selectedPrice}
						onSelect={setSelectedPrice}
					/>
					<FilterSection
						title="Bedrooms"
						options={BEDROOMS}
						selected={selectedBedrooms}
						onSelect={setSelectedBedrooms}
					/>

					{/* Clear all filters button (only shown when any filter is active) */}
					{hasActiveFilters && (
						<TouchableOpacity
							style={styles.clearButton}
							onPress={clearAllFilters}
						>
							<Ionicons name="close-circle-outline" size={18} color="#d9534f" />
							<Text style={styles.clearButtonText}>Clear all filters</Text>
						</TouchableOpacity>
					)}
				</View>
			)}

			{/* TOGGLE + TOTAL */}
			<View style={styles.toggleRowWithCount}>
				<Text style={styles.totalCount}>
					{filteredProperties.length} properties found
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

			{/* CONTENT */}
			{viewMode === "list" ? (
				<FlatList
					data={filteredProperties}
					keyExtractor={(item) => item.id!.toString()}
					renderItem={({ item }) => <PropertyCard property={item} />}
					ListEmptyComponent={
						<Text style={styles.emptyText}>
							No properties match your filters.
						</Text>
					}
				/>
			) : (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: filteredProperties[0]?.location.latitude || 13.7563,
						longitude: filteredProperties[0]?.location.longitude || 100.5018,
						latitudeDelta: 0.1,
						longitudeDelta: 0.1,
					}}
				>
					{filteredProperties.map((p) =>
						p.location.latitude && p.location.longitude ? (
							<Marker
								key={p.id}
								coordinate={{
									latitude: p.location.latitude,
									longitude: p.location.longitude,
								}}
								title={p.title}
								description={p.location.address}
								onPress={() => router.push(`/buySell/${p.id}`)}
							/>
						) : null,
					)}
				</MapView>
			)}
		</SafeAreaView>
	);
}

// FilterSection component (unchanged except styles)
function FilterSection({
	title,
	options,
	selected,
	onSelect,
}: {
	title: string;
	options: string[];
	selected: string;
	onSelect: (value: string) => void;
}) {
	return (
		<View style={styles.filterSection}>
			<Text style={styles.filterTitle}>{title}</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{options.map((opt) => (
					<TouchableOpacity
						key={opt}
						style={[
							styles.filterBtn,
							selected === opt && styles.filterBtnActive,
						]}
						onPress={() => onSelect(opt)}
					>
						<Text
							style={selected === opt ? styles.filterTextActive : undefined}
						>
							{opt}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		gap: 8,
	},
	searchBar: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 40,
	},
	filtersContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	filterSection: {
		marginBottom: 12,
	},
	filterTitle: {
		fontWeight: "bold",
		marginBottom: 6,
	},
	filterBtn: {
		backgroundColor: "#eee",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginRight: 8,
	},
	filterBtnActive: {
		backgroundColor: "#2c6e9e",
	},
	filterTextActive: {
		color: "#fff",
		fontWeight: "500",
	},
	categoryRow: {
		flexGrow: 0,
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 10,
		marginBottom: 8,
	},
	categoryBtn: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: "#eee",
		borderRadius: 6,
		marginRight: 8,
	},
	toggleRowWithCount: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	totalCount: {
		fontWeight: "bold",
		fontSize: 16,
	},
	toggleRow: {
		flexDirection: "row",
		gap: 20,
	},
	active: {
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	map: {
		flex: 1,
	},
	emptyText: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 16,
		color: "#888",
	},
	clearButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		paddingVertical: 8,
		backgroundColor: "#f9f2f2",
		borderRadius: 20,
		alignSelf: "flex-start",
		paddingHorizontal: 12,
		gap: 4,
	},
	clearButtonText: {
		color: "#d9534f",
		fontSize: 14,
		fontWeight: "500",
	},
});
