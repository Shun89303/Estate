import { useState, useMemo, useRef } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

// Reusable components
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import FilterButton from "@/components/common/utils/FilterButton";
import SearchBar from "@/components/common/utils/SearchBar";
import FilterSection from "@/components/common/utils/FilterSection";
import ViewToggleWithCount from "@/components/common/utils/ViewToggleWithCount";
import PropertyList from "@/components/common/dataEntry/PropertyList";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import BuyBusinessCard from "@/components/buyBusiness/BuyBusinessCard";
import { useCoinBalance } from "@/components/coin/useCoinBalance";
import { useUserStore } from "@/stores/userStore";

// Data and types
import { MOCK_BUY_BUSINESS, BuyBusiness } from "@/mock/buyBusiness";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import { Coins, EyeOff, Lock, LockOpen } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import ClearFiltersButton from "@/components/common/utils/ClearFiltersButton";
import { useShortlist } from "@/components/shortlist/useShortlist";

// Helper to get emoji for business type
// const getTypeEmoji = (type: BuyBusiness["type"]) => {
// 	switch (type) {
// 		case "Restaurant":
// 			return "🍽️";
// 		case "Cafe":
// 			return "☕";
// 		case "Hotel":
// 			return "🏨";
// 		case "Spa/Massage":
// 			return "💆";
// 		case "Retail":
// 			return "🛍️";
// 		case "Franchise":
// 			return "🏪";
// 		default:
// 			return "";
// 	}
// };

export default function BuyBusinessPage() {
	const router = useRouter();
	const {
		CoinButton,
		CoinBottomSheet,
		closeSheet: closeCoin,
	} = useCoinBalance();
	const { coins: coinBalance, deductCoins } = useUserStore();
	const {
		ShortlistButton,
		ShortlistBottomSheet,
		closeSheet: closeShortlist,
	} = useShortlist();

	// UI state
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedType, setSelectedType] = useState("All");
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedPrice, setSelectedPrice] = useState("Any");
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<"list" | "map">("list");

	// Unlock state
	const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
	const [selectedProperty, setSelectedProperty] = useState<BuyBusiness | null>(
		null,
	);
	const unlockModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["50%"], []);

	const closeAllSheets = () => {
		closeCoin();
		closeShortlist();
		unlockModalRef.current?.dismiss();
	};

	// Filter options
	const typeOptions = [
		"All",
		"🍽️ Restaurant",
		"☕ Cafe",
		"🏨 Hotel",
		"💆 Spa/Massage",
		"🛍️ Retail",
		"🏪 Franchise",
	];
	const locationOptions = [
		"All",
		"Thonglor",
		"Sukhumvit",
		"Pattaya",
		"Silom",
		"Siam",
		"Asoke",
	];
	const priceOptions = ["Any", "< ฿1M", "฿1-5M", "฿5-10M", "฿10M+"];

	// Filtering logic
	const filteredData = useMemo(() => {
		let filtered = [...MOCK_BUY_BUSINESS];

		// Search
		if (searchQuery.trim()) {
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.location.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// Type filter (always active)
		if (selectedType !== "All") {
			const typeWithoutEmoji = selectedType
				.replace(/[🍽️☕🏨💆🛍️🏪]/g, "")
				.trim();
			filtered = filtered.filter((item) => item.type === typeWithoutEmoji);
		}

		// Location filter (only when visible)
		if (showFilters && selectedLocation !== "All") {
			filtered = filtered.filter((item) =>
				item.location.toLowerCase().includes(selectedLocation.toLowerCase()),
			);
		}

		// Price filter (only when visible)
		if (showFilters && selectedPrice !== "Any") {
			filtered = filtered.filter((item) => {
				const price = item.price;
				switch (selectedPrice) {
					case "< ฿1M":
						return price < 1_000_000;
					case "฿1-5M":
						return price >= 1_000_000 && price < 5_000_000;
					case "฿5-10M":
						return price >= 5_000_000 && price < 10_000_000;
					case "฿10M+":
						return price >= 10_000_000;
					default:
						return true;
				}
			});
		}

		return filtered;
	}, [searchQuery, selectedType, selectedLocation, selectedPrice, showFilters]);

	// Map markers
	const markers = useMemo(() => {
		return filteredData.map((item) => ({
			id: item.uniqueCode,
			latitude: item.geoLocation.latitude,
			longitude: item.geoLocation.longitude,
			title: item.title,
			description: `฿${item.price.toLocaleString()}`,
			onPress: () => {
				// If unlocked, navigate; else open unlock sheet
				const isUnlocked = unlockedIds.includes(item.uniqueCode);
				if (isUnlocked) {
					router.push(`/`);
				} else {
					setSelectedProperty(item);
					unlockModalRef.current?.present();
				}
			},
		}));
	}, [filteredData, unlockedIds]);

	// Count active filters (excluding type which is always visible)
	const activeFilterCount =
		(selectedLocation !== "All" ? 1 : 0) +
		(selectedPrice !== "Any" ? 1 : 0) +
		(selectedType !== "All" ? 1 : 0);

	const handleFilterPress = () => {
		closeAllSheets();
		setShowFilters((prev) => !prev);
	};

	const handleCardPress = (item: BuyBusiness) => {
		const isUnlocked = unlockedIds.includes(item.uniqueCode);
		if (isUnlocked) {
			router.push(`/`);
		} else {
			closeAllSheets();
			setSelectedProperty(item);
			unlockModalRef.current?.present();
		}
	};

	const handleUnlock = () => {
		if (!selectedProperty) return;
		const cost = selectedProperty.unlockCoins;
		const success = deductCoins(cost);
		if (success) {
			setUnlockedIds((prev) => [...prev, selectedProperty.uniqueCode]);
			unlockModalRef.current?.dismiss();
		} else {
			alert("Not enough coins. Please top up.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Header Row */}
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<BackButton />
					<Title variant="page" style={styles.headerTitle}>
						Buy Business
					</Title>
				</View>
				<View style={styles.headerRight}>
					<ShortlistButton />
					<CoinButton />
					<FilterButton
						isOpen={showFilters}
						activeCount={activeFilterCount}
						onPress={handleFilterPress}
					/>
				</View>
			</View>

			{/* Search Bar */}
			<SearchBar
				placeholder="Search businesses for sale..."
				value={searchQuery}
				onChangeText={setSearchQuery}
				containerStyle={styles.searchBar}
			/>

			{/* Collapsible Filters (Location & Price) */}
			{showFilters && (
				<View style={styles.filtersContainer}>
					<FilterSection
						title="LOCATION"
						options={locationOptions}
						selected={selectedLocation}
						onSelect={setSelectedLocation}
					/>
					<FilterSection
						title="ASKING PRICE"
						options={priceOptions}
						selected={selectedPrice}
						onSelect={setSelectedPrice}
					/>
					{/* Clear filters button - only shown if any filter is active */}
					{(selectedLocation !== "All" ||
						selectedPrice !== "Any" ||
						selectedType !== "All") && (
						<ClearFiltersButton
							onPress={() => {
								setSelectedLocation("All");
								setSelectedPrice("Any");
								setSelectedType("All");
							}}
						/>
					)}
				</View>
			)}

			{/* Always visible Type Filter */}
			<View style={styles.filtersContainer}>
				<FilterSection
					options={typeOptions}
					selected={selectedType}
					onSelect={setSelectedType}
				/>
			</View>

			{/* Count & Toggle */}
			<ViewToggleWithCount
				count={filteredData.length}
				countLabel="businesses found"
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			{/* List / Map View */}
			{viewMode === "list" ? (
				<PropertyList
					data={filteredData}
					keyExtractor={(item) => item.uniqueCode}
					renderItem={(item) => (
						<BuyBusinessCard
							property={item}
							isUnlocked={unlockedIds.includes(item.uniqueCode)}
							onPress={() => handleCardPress(item)}
						/>
					)}
					contentContainerStyle={styles.listContent}
				/>
			) : (
				<View style={styles.mapContainer}>
					<PropertyMap markers={markers} />
				</View>
			)}

			{/* Unlock Bottom Sheet */}
			<BottomSheetModal
				ref={unlockModalRef}
				snapPoints={snapPoints}
				enablePanDownToClose
				backgroundStyle={{ backgroundColor: lightColors.background }}
				handleIndicatorStyle={{ backgroundColor: lightColors.bodyText }}
			>
				{selectedProperty && (
					<BottomSheetView style={styles.sheetContent}>
						<View style={styles.sheetHeader}>
							<View style={styles.lockIconContainer}>
								<Lock size={30} color={lightColors.brand} />
							</View>
							<Title variant="page" style={styles.sheetTitle}>
								Unlock Contact Info
							</Title>
							<BodyText variant="normal" style={styles.sheetSubtitle}>
								{selectedProperty.title}
							</BodyText>
						</View>

						<View style={styles.sheetBox}>
							<View>
								<BodyText variant="normal">Owner Name</BodyText>
								<BodyText variant="normal">Phone Number</BodyText>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<EyeOff size={12} color={lightColors.bodyText} />
									<BodyText variant="normal">Hidden</BodyText>
								</View>
								<View style={styles.hiddenRow}>
									<EyeOff size={12} color={lightColors.bodyText} />
									<BodyText variant="normal">Hidden</BodyText>
								</View>
							</View>
						</View>

						<View style={[styles.sheetBox, styles.sheetBoxTransparent]}>
							<View>
								<BodyText variant="normal">Cost</BodyText>
								<BodyText variant="normal">Your Balance</BodyText>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<Coins size={12} color={lightColors.brand} />
									<BodyText
										variant="normal"
										style={{ color: lightColors.brand }}
									>
										{selectedProperty.unlockCoins} Coins
									</BodyText>
								</View>
								<View style={styles.hiddenRow}>
									<Coins size={12} color={lightColors.brand} />
									<BodyText variant="normal">{coinBalance} coins</BodyText>
								</View>
							</View>
						</View>

						<Pressable
							style={[styles.unlockBtn, { backgroundColor: lightColors.brand }]}
							onPress={handleUnlock}
						>
							<LockOpen size={12} color="#fff" />
							<BodyText variant="normal" style={styles.unlockBtnText}>
								Unlock for {selectedProperty.unlockCoins} Coins
							</BodyText>
						</Pressable>
					</BottomSheetView>
				)}
			</BottomSheetModal>

			<ShortlistBottomSheet />
			<CoinBottomSheet />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightColors.entireAppBackground,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	headerTitle: {
		marginBottom: 0,
	},
	headerRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	searchBar: {
		marginHorizontal: spacing.lg,
		marginBottom: spacing.md,
		flex: 0,
	},
	filtersContainer: {
		paddingHorizontal: spacing.lg,
	},
	listContent: {
		paddingBottom: spacing.xl,
		paddingHorizontal: spacing.lg,
	},
	mapContainer: {
		flex: 1,
		marginHorizontal: spacing.lg,
		marginBottom: spacing.md,
		borderRadius: scaleSize(12),
		overflow: "hidden",
	},
	// Bottom sheet styles
	sheetContent: {
		padding: spacing.lg,
		gap: spacing.md,
	},
	sheetHeader: {
		alignItems: "center",
	},
	lockIconContainer: {
		backgroundColor: lightColors.brandBG,
		padding: spacing.sm,
		borderRadius: scaleSize(99),
		marginBottom: spacing.sm,
	},
	sheetTitle: {
		marginBottom: spacing.xs,
	},
	sheetSubtitle: {
		textAlign: "center",
		color: lightColors.bodyText,
	},
	sheetBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: lightColors.mutedBackground,
		padding: spacing.md,
		borderRadius: scaleSize(10),
	},
	sheetBoxTransparent: {
		backgroundColor: "transparent",
	},
	hiddenRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(5),
	},
	unlockBtn: {
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: scaleSize(5),
	},
	unlockBtnText: {
		fontWeight: "600",
		color: "#fff",
		marginBottom: 0,
	},
});
