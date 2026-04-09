import { useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_ROOM_RENT } from "@/mock/roomRent";
import { PropertyMap } from "@/components/common/PropertyMap";
import FilterSection from "@/components/common/FilterSection";
import BackButton from "@/components/common/BackButton";
import { PageTitle } from "@/components/atoms/Typography";
import ClearFiltersButton from "@/components/common/ClearFiltersButton";
import FilterButton from "@/components/common/FilterButton";
import SearchBar from "@/components/common/SearchBar";
import { useTheme } from "@/hooks/useTheme";
import ViewToggleWithCount from "@/components/common/ViewToggleWithCount";
import globalStyles from "@/styles/styles";
import RoomCard from "@/components/roomRent/RoomCard";

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
	const colors = useTheme();
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

	const hasActiveFilters = useMemo(() => {
		return (
			activeLocation !== "All" || activePrice !== "Any" || activeType !== "All"
		);
	}, [activeLocation, activePrice, activeType]);

	const clearAllFilters = () => {
		setActiveLocation("All");
		setActivePrice("Any");
		setActiveType("All");
	};

	const activeFilterCount = useMemo(() => {
		let count = 0;
		if (activeLocation !== "All") count++;
		if (activePrice !== "Any") count++;
		if (activeType !== "All") count++;
		return count;
	}, [activeLocation, activePrice, activeType]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-end",
					}}
				>
					<BackButton />
					<PageTitle>Room Renting</PageTitle>
				</View>
				<FilterButton
					isOpen={showFilters}
					activeCount={activeFilterCount}
					onPress={() => setShowFilters((prev) => !prev)}
				/>
			</View>

			{/* Reusable SearchBar */}
			<SearchBar
				placeholder="Search by room name or location..."
				value={searchText}
				onChangeText={setSearchText}
				containerStyle={{
					marginHorizontal: 16,
					marginVertical: 8,
					flex: 0,
				}}
			/>

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
					{hasActiveFilters && (
						<ClearFiltersButton
							onPress={clearAllFilters}
							iconColor={colors.primaryGold}
							textColor={colors.primaryGold}
						/>
					)}
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

			{/* TOGGLE + TOTAL */}
			<ViewToggleWithCount
				count={filteredRooms.length}
				countLabel="rooms found"
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

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

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
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
	cardImage: { width: 100, height: 80, borderRadius: 6 },
	cardInfo: { marginLeft: 12, flex: 1 },
	propertyType: { fontSize: 12, fontWeight: "500", color: "#555" },
	propertyTitle: { fontSize: 14, fontWeight: "600" },
	propertyLocation: { fontSize: 12, color: "#777", marginVertical: 2 },
	propertyDetails: { fontSize: 12, color: "#555" },
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginHorizontal: 16,
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
	imageNewBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 99,
	},
	imageNewBadgeText: {
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
		alignItems: "flex-end",
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
