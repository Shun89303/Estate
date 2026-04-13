import { useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BusinessPropertyType, MOCK_BUSINESS } from "@/mock/business";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import FilterSection from "@/components/common/utils/FilterSection";
import BackButton from "@/components/common/navigation/BackButton";
import { PageTitle } from "@/components/atoms/Typography";
import ClearFiltersButton from "@/components/common/utils/ClearFiltersButton";
import FilterButton from "@/components/common/utils/FilterButton";
import SearchBar from "@/components/common/utils/SearchBar";
import { useTheme } from "@/hooks/useTheme";
import ViewToggleWithCount from "@/components/common/utils/ViewToggleWithCount";
import EmptyState from "@/components/common/state/EmptyState";
import globalStyles from "@/styles/styles";
import BusinessCard from "@/components/business/BusinessCard";

const LOCATIONS = [
	"All",
	"Silom",
	"Ekkamai",
	"Chatuchak",
	"Bangna",
	"Ari",
	"Ratchada",
];
const PRICE_RANGES = ["All", "<฿10K", "฿10-25K", "฿25-50K", "฿50K+"];
const TYPE_FILTERS: BusinessPropertyType[] = [
	"OFFICE",
	"CO_WORKING",
	"SHOP_RETAIL",
	"WAREHOUSE",
	"RESTAURANT",
	"EVENT_VENUE",
];

export default function Business() {
	const router = useRouter();
	const colors = useTheme();
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	const [showFilters, setShowFilters] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
	const [selectedType, setSelectedType] = useState<string>("All");

	const matchesPriceRange = (price: number): boolean => {
		if (selectedPriceRange === "All") return true;
		switch (selectedPriceRange) {
			case "<฿10K":
				return price < 10000;
			case "฿10-25K":
				return price >= 10000 && price <= 25000;
			case "฿25-50K":
				return price >= 25000 && price <= 50000;
			case "฿50K+":
				return price > 50000;
			default:
				return true;
		}
	};

	const filteredData = useMemo(() => {
		return MOCK_BUSINESS.filter((item) => {
			const matchesSearch =
				searchQuery === "" ||
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.location.address.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesLocation =
				selectedLocation === "All" ||
				item.location.address.includes(selectedLocation);
			const matchesPrice = matchesPriceRange(item.pricing.amount);
			const matchesType = selectedType === "All" || item.type === selectedType;
			return matchesSearch && matchesLocation && matchesPrice && matchesType;
		});
	}, [searchQuery, selectedLocation, selectedPriceRange, selectedType]);

	const hasActiveFilters = useMemo(() => {
		return (
			selectedLocation !== "All" ||
			selectedPriceRange !== "All" ||
			selectedType !== "All"
		);
	}, [selectedLocation, selectedPriceRange, selectedType]);

	const clearAllFilters = () => {
		setSelectedLocation("All");
		setSelectedPriceRange("All");
		setSelectedType("All");
	};

	const activeFilterCount = useMemo(() => {
		let count = 0;
		if (selectedLocation !== "All") count++;
		if (selectedPriceRange !== "All") count++;
		if (selectedType !== "All") count++;
		return count;
	}, [selectedLocation, selectedPriceRange, selectedType]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "flex-end" }}>
					<BackButton />
					<PageTitle>Business Spaces</PageTitle>
				</View>
				<FilterButton
					isOpen={showFilters}
					activeCount={activeFilterCount}
					onPress={() => setShowFilters((prev) => !prev)}
				/>
			</View>

			<SearchBar
				placeholder="Search by name, location or district..."
				value={searchQuery}
				onChangeText={setSearchQuery}
				containerStyle={{ marginHorizontal: 16, marginVertical: 8, flex: 0 }}
			/>

			{showFilters && (
				<View style={{ paddingHorizontal: 16, marginTop: 8 }}>
					<FilterSection
						title="Location"
						options={LOCATIONS}
						selected={selectedLocation}
						onSelect={setSelectedLocation}
					/>
					<FilterSection
						title="Price Range"
						options={PRICE_RANGES}
						selected={selectedPriceRange}
						onSelect={setSelectedPriceRange}
					/>
					{hasActiveFilters && (
						<ClearFiltersButton
							onPress={clearAllFilters}
							iconColor={colors.primaryGold}
							textColor={colors.primaryGold}
						/>
					)}
				</View>
			)}

			<View style={{ paddingHorizontal: 16, marginTop: 8 }}>
				<FilterSection
					options={["All", ...TYPE_FILTERS].map((t) => t.replace("_", " "))}
					selected={
						selectedType === "All" ? "All" : selectedType.replace("_", " ")
					}
					onSelect={(value) => {
						if (value === "All") setSelectedType("All");
						else {
							const original = TYPE_FILTERS.find(
								(t) => t.replace("_", " ") === value,
							);
							if (original) setSelectedType(original);
						}
					}}
				/>
			</View>

			<ViewToggleWithCount
				count={filteredData.length}
				countLabel="spaces found"
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			{viewMode === "list" ? (
				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <BusinessCard property={item} />}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					ListEmptyComponent={<EmptyState />}
				/>
			) : (
				<PropertyMap
					markers={filteredData.map((p) => ({
						id: p.id,
						latitude: p.location.latitude,
						longitude: p.location.longitude,
						title: p.title,
						description: p.location.address,
						onPress: () => router.push(`/property/business/${p.id}`),
					}))}
					style={{ flex: 1 }}
				/>
			)}
		</SafeAreaView>
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

	// Card styles
	card: {
		flexDirection: "row",
		borderRadius: 12,
		marginBottom: 12,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	imageContainer: {
		width: 130,
		alignSelf: "stretch",
		position: "relative",
	},
	image: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
	},
	typeBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 99,
	},
	typeBadgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
		paddingVertical: 20,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	title: {
		marginBottom: 4,
		lineHeight: 20,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	address: {
		marginLeft: 4,
		fontSize: 12,
		flexShrink: 1,
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 8,
	},
	specsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginTop: 4,
	},
	specsColumn: {
		flexDirection: "column",
		gap: 4,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	specText: {
		fontSize: 12,
	},
});
