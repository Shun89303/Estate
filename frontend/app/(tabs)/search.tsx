import { useState, useMemo } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertyCard from "@/components/home/property/PropertyCard";
import { useRouter } from "expo-router";
import { MOCK_BUYSELL, Property } from "@/mock/buySell";
import { PropertyMap } from "@/components/common/PropertyMap";
import FilterSection from "@/components/common/FilterSection";
import BackButton from "@/components/common/BackButton";
import HorizontalTypeFilter from "@/components/common/HorizontalTypeFilter";
import { useTheme } from "@/hooks/useTheme";
import ClearFiltersButton from "@/components/common/ClearFiltersButton";
import SearchBar from "@/components/common/SearchBar";
import ViewToggleWithCount from "@/components/common/ViewToggleWithCount";
import EmptyState from "@/components/common/EmptyState";
import FilterButton from "@/components/common/FilterButton";

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
	const colors = useTheme();
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	const [showFilters, setShowFilters] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

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
			// Search filter (title or address)
			const matchesSearch =
				searchQuery === "" ||
				property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				property.location.address
					.toLowerCase()
					.includes(searchQuery.toLowerCase());

			// Type filter
			let matchesType = true;
			if (selectedType !== "All") {
				const expectedType = mapTypeToEnum(selectedType);
				if (expectedType && property.type !== expectedType) matchesType = false;
			}

			// Location filter
			let matchesLocation = true;
			if (selectedLocation !== "All") {
				const lowerAddress = property.location.address.toLowerCase();
				if (!lowerAddress.includes(selectedLocation.toLowerCase()))
					matchesLocation = false;
			}

			// Price filter
			const [minPrice, maxPrice] = getPriceRange(selectedPrice);
			const matchesPrice =
				property.price >= minPrice && property.price <= maxPrice;

			// Bedrooms filter
			const minBed = getBedroomsMin(selectedBedrooms);
			const matchesBedrooms = property.bedrooms >= minBed;

			return (
				matchesSearch &&
				matchesType &&
				matchesLocation &&
				matchesPrice &&
				matchesBedrooms
			);
		});
	}, [
		searchQuery,
		selectedType,
		selectedLocation,
		selectedPrice,
		selectedBedrooms,
	]);

	const activeFilterCount = useMemo(() => {
		let count = 0;
		if (selectedPurpose !== "All") count++;
		if (selectedType !== "All") count++;
		if (selectedLocation !== "All") count++;
		if (selectedPrice !== "Any") count++;
		if (selectedBedrooms !== "Any") count++;
		return count;
	}, [
		selectedPurpose,
		selectedType,
		selectedLocation,
		selectedPrice,
		selectedBedrooms,
	]);

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<BackButton />

				<SearchBar
					placeholder="Search property or location..."
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>

				<FilterButton
					isOpen={showFilters}
					activeCount={activeFilterCount}
					onPress={() => setShowFilters((prev) => !prev)}
				/>
			</View>

			{/* CATEGORY ROW */}

			<View style={{ flexShrink: 0 }}>
				<HorizontalTypeFilter />
			</View>

			{/* FILTERS */}
			{showFilters && (
				<View
					style={[
						styles.filtersContainer,
						{
							borderColor: colors.primaryMute,
						},
					]}
				>
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
					{hasActiveFilters && <ClearFiltersButton onPress={clearAllFilters} />}
				</View>
			)}

			{/* TOGGLE + TOTAL */}
			<ViewToggleWithCount
				count={filteredProperties.length}
				countLabel="properties found"
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			{/* CONTENT */}
			{viewMode === "list" ? (
				<FlatList
					data={filteredProperties}
					keyExtractor={(item) => item.id!.toString()}
					renderItem={({ item }) => (
						<PropertyCard
							property={item}
							style={{ marginHorizontal: 0, width: "auto" }}
						/>
					)}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					ListEmptyComponent={<EmptyState />}
				/>
			) : (
				<PropertyMap
					markers={filteredProperties.map((p) => ({
						id: p.id,
						latitude: p.location.latitude,
						longitude: p.location.longitude,
						title: p.title,
						description: p.location.address,
						onPress: () => router.push(`/buySell/${p.id}`),
					}))}
					style={styles.map}
				/>
			)}
		</SafeAreaView>
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
	searchContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 40,
		gap: 8,
	},
	searchInput: {
		flex: 1,
		height: "100%",
		padding: 0,
	},
	badge: {
		position: "absolute",
		top: -6,
		right: -6,
		borderRadius: 10,
		minWidth: 18,
		height: 18,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 4,
	},
	badgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	filtersContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderTopWidth: 2,
		borderBottomWidth: 2,
		marginVertical: 16,
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
	toggleContainer: {
		flexDirection: "row",
		backgroundColor: "#f0f0f0",
		borderRadius: 30,
		padding: 4,
	},
	toggleButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 30,
		gap: 6,
	},
	toggleButtonActive: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	toggleText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#666",
	},
});
