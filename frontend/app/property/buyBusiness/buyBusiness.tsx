import { useState, useMemo } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Reusable components
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import FilterButton from "@/components/common/utils/FilterButton";
import SearchBar from "@/components/common/utils/SearchBar";
import FilterSection from "@/components/common/utils/FilterSection";
import ViewToggleWithCount from "@/components/common/utils/ViewToggleWithCount";
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import BuyBusinessCard from "@/components/buyBusiness/BuyBusinessCard";
import { useCoinBalance } from "@/components/coin/useCoinBalance";
import { useUserStore } from "@/stores/userStore";

// Data and types
import { MOCK_BUY_BUSINESS, BuyBusiness } from "@/mock/buyBusiness";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import { LockOpen, GitCompareArrows } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import ClearFiltersButton from "@/components/common/utils/ClearFiltersButton";
import { useShortlist } from "@/components/shortlist/useShortlist";
import BuyBusinessUnlockedCard from "@/components/buyBusiness/BuyBusinessUnlockedCard";
import globalStyles from "@/styles/styles";
import { useBuyBusinessStore } from "@/stores/buyBusinessStore";
import { useCompareSheet } from "@/components/buyBusiness/compare/useCompareSheet";
import { useUnlockSheet } from "@/components/buyBusiness/unlock/useUnlockSheet";

export default function BuyBusinessPage() {
	const router = useRouter();
	// coin ui
	const { CoinButton, CoinBottomSheet } = useCoinBalance();
	// coin store
	const { coins: coinBalance, deductCoins } = useUserStore();
	// shortlist ui
	const { ShortlistButton, ShortlistBottomSheet } = useShortlist();

	// UI state
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedType, setSelectedType] = useState("All");
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedPrice, setSelectedPrice] = useState("Any");
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	// compare mode
	const [isCompareMode, setCompareMode] = useState(false);
	const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
	const { open: openCompareSheet, CompareSheet } = useCompareSheet();

	// Unlock state
	const { unlockedIds, unlockBusiness } = useBuyBusinessStore();
	const unlockedBusinesses = useMemo(() => {
		return MOCK_BUY_BUSINESS.filter((item) =>
			unlockedIds.includes(item.uniqueCode),
		);
	}, [unlockedIds]);
	const { open: openUnlockSheet, UnlockSheet } = useUnlockSheet();
	// const unlockModalRef = useRef<BottomSheetModal>(null);
	// const snapPoints = useMemo(() => ["70%"], []);

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

		if (searchQuery.trim()) {
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.location.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		if (selectedType !== "All") {
			const typeWithoutEmoji = selectedType
				.replace(/[🍽️☕🏨💆🛍️🏪]/g, "")
				.trim();
			filtered = filtered.filter((item) => item.type === typeWithoutEmoji);
		}

		if (showFilters && selectedLocation !== "All") {
			filtered = filtered.filter((item) =>
				item.location.toLowerCase().includes(selectedLocation.toLowerCase()),
			);
		}

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
				const isUnlocked = unlockedIds.includes(item.uniqueCode);
				if (isUnlocked) {
					router.push(`/property/buyBusiness/${item.id}`);
				} else {
					openUnlockSheet(item, coinBalance, () => {
						const cost = item.unlockCoins;
						const success = deductCoins(cost);
						if (success) {
							unlockBusiness(item.uniqueCode);
						} else {
							alert("Not enough coins. Please top up.");
						}
					});
				}
			},
		}));
	}, [filteredData, unlockedIds]);

	const activeFilterCount =
		(selectedLocation !== "All" ? 1 : 0) +
		(selectedPrice !== "Any" ? 1 : 0) +
		(selectedType !== "All" ? 1 : 0);

	const handleFilterPress = () => {
		setShowFilters((prev) => !prev);
	};

	const handleCardPress = (item: BuyBusiness) => {
		const isUnlocked = unlockedIds.includes(item.uniqueCode);
		if (isUnlocked) {
			router.push(`/property/buyBusiness/${item.id}`);
		} else {
			openUnlockSheet(item, coinBalance, () => {
				const cost = item.unlockCoins;
				const success = deductCoins(cost);
				if (success) {
					unlockBusiness(item.uniqueCode);
				} else {
					alert("Not enough coins. Please top up.");
				}
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
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

			{/* Fixed Search & Filters (always visible) */}
			<View style={styles.searchAndFilters}>
				<View
					style={{
						backgroundColor: lightColors.background,
					}}
				>
					<SearchBar
						placeholder="Search businesses for sale..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						containerStyle={styles.searchBar}
					/>
				</View>

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
					</View>
				)}

				<View style={{ backgroundColor: lightColors.background }}>
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

				<View style={styles.filtersContainer}>
					<FilterSection
						options={typeOptions}
						selected={selectedType}
						onSelect={setSelectedType}
					/>
				</View>

				<ViewToggleWithCount
					count={filteredData.length}
					countLabel="businesses found"
					viewMode={viewMode}
					onViewModeChange={(mode) => {
						if (!isCompareMode) setViewMode(mode);
					}}
					showCompare={unlockedBusinesses.length >= 2}
					isCompareMode={isCompareMode}
					onComparePress={() => {
						if (isCompareMode) {
							setCompareMode(false);
							setSelectedCompareIds([]);
						} else {
							setCompareMode(true);
							setViewMode("list");
						}
					}}
				/>

				{/* Recently Unlocked Section (if any) */}
				{unlockedBusinesses.length > 0 && !isCompareMode && (
					<View style={styles.recentlyUnlockedSection}>
						<View style={styles.recentlyUnlockedHeader}>
							<View style={styles.recentlyUnlockedLeft}>
								<LockOpen
									size={moderateScale(20)}
									color={lightColors.success}
								/>
								<Title variant="small" style={styles.recentlyUnlockedTitle}>
									Recently Unlocked
								</Title>
							</View>
							<BodyText variant="small" style={styles.recentlyUnlockedCount}>
								{unlockedBusinesses.length} unlocked
							</BodyText>
						</View>
						<FlatList
							horizontal
							data={unlockedBusinesses}
							keyExtractor={(item) => item.uniqueCode}
							renderItem={({ item }) => (
								<BuyBusinessUnlockedCard
									property={item}
									onPress={() =>
										router.push(`/property/buyBusiness/${item.id}`)
									}
								/>
							)}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.recentlyUnlockedList}
						/>
					</View>
				)}
			</View>

			{!isCompareMode ? (
				viewMode === "list" ? (
					<FlatList
						data={filteredData}
						keyExtractor={(item) => item.uniqueCode}
						renderItem={({ item }) => (
							<BuyBusinessCard
								property={item}
								isUnlocked={unlockedIds.includes(item.uniqueCode)}
								onPress={() => handleCardPress(item)}
								isCompareMode={false}
							/>
						)}
						contentContainerStyle={styles.listContent}
						ListFooterComponent={
							viewMode === "list" ? (
								<View style={{ height: spacing.xl }} />
							) : undefined
						}
					/>
				) : (
					<>
						{/* Show top UI (except main list) above map */}
						<View style={styles.mapContainer}>
							<PropertyMap markers={markers} />
						</View>
					</>
				)
			) : (
				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.uniqueCode}
					renderItem={({ item }) => {
						const isUnlocked = unlockedIds.includes(item.uniqueCode);
						const isSelected = selectedCompareIds.includes(item.uniqueCode);
						return (
							<BuyBusinessCard
								property={item}
								isUnlocked={isUnlocked}
								onPress={() => {
									if (!isUnlocked) {
										openUnlockSheet(item, coinBalance, () => {
											const cost = item.unlockCoins;
											const success = deductCoins(cost);
											if (success) {
												unlockBusiness(item.uniqueCode);
											} else {
												alert("Not enough coins. Please top up.");
											}
										});
									} else {
										if (isSelected) {
											setSelectedCompareIds((prev) =>
												prev.filter((id) => id !== item.uniqueCode),
											);
										} else {
											if (selectedCompareIds.length >= 3) {
												alert("You can compare up to 3 businesses only.");
												return;
											}
											setSelectedCompareIds((prev) => [
												...prev,
												item.uniqueCode,
											]);
										}
									}
								}}
								isCompareMode={true}
								isSelected={isSelected}
							/>
						);
					}}
					contentContainerStyle={styles.listContent}
					ListFooterComponent={<View style={{ height: scaleSize(80) }} />}
				/>
			)}

			{isCompareMode && (
				<View style={styles.bottomBar}>
					<View style={styles.bottomBarLeft}>
						<Title variant="small" style={styles.bottomBarTitle}>
							{selectedCompareIds.length}/3 selected
						</Title>
						<BodyText variant="small" style={styles.bottomBarSubtitle}>
							Tap unlocked businesses to select
						</BodyText>
					</View>
					<View style={styles.bottomBarRight}>
						<TouchableOpacity
							onPress={() => {
								setCompareMode(false);
								setSelectedCompareIds([]);
							}}
							style={styles.cancelButton}
						>
							<Title
								variant="small"
								style={{ color: lightColors.bigTitleText, marginBottom: 0 }}
							>
								Cancel
							</Title>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								if (selectedCompareIds.length >= 2) {
									const selected = MOCK_BUY_BUSINESS.filter((b) =>
										selectedCompareIds.includes(b.uniqueCode),
									);
									openCompareSheet(selected);
									setCompareMode(false);
									setSelectedCompareIds([]);
								}
							}}
							style={[
								styles.confirmButton,
								{ backgroundColor: lightColors.brand },
								selectedCompareIds.length < 2 && { opacity: 0.5 },
							]}
							disabled={selectedCompareIds.length < 2}
						>
							<GitCompareArrows size={moderateScale(16)} color="#fff" />
							<Title
								variant="small"
								style={{
									color: "#fff",
									marginLeft: spacing.xs,
									marginBottom: 0,
								}}
							>
								Compare
							</Title>
						</TouchableOpacity>
					</View>
				</View>
			)}

			<ShortlistBottomSheet />
			<CoinBottomSheet />
			<CompareSheet />
			<UnlockSheet />
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
		backgroundColor: lightColors.background,
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
		backgroundColor: lightColors.background,
	},
	mapContainer: {
		flex: 1,
		marginHorizontal: spacing.lg,
		marginBottom: spacing.md,
		borderRadius: scaleSize(12),
		overflow: "hidden",
	},
	recentlyUnlockedSection: {
		marginTop: spacing.md,
		marginBottom: spacing.md,
	},
	recentlyUnlockedHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.sm,
	},
	recentlyUnlockedLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	recentlyUnlockedTitle: {
		marginBottom: 0,
	},
	recentlyUnlockedCount: {
		marginBottom: 0,
	},
	recentlyUnlockedList: {
		paddingHorizontal: spacing.lg,
	},
	mapTopContent: {
		// no extra padding – renderHeader already has its own margins
	},
	bottomBar: {
		position: "absolute",
		bottom: scaleSize(50),
		left: scaleSize(10),
		right: scaleSize(10),
		backgroundColor: lightColors.background,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		borderTopWidth: scaleSize(1),
		borderRadius: scaleSize(15),
		borderTopColor: lightColors.mutedBorder,
		zIndex: 1000,
		...globalStyles.shadows,
	},
	bottomBarLeft: {
		flex: 1,
	},
	bottomBarTitle: {
		marginBottom: scaleSize(2),
	},
	bottomBarSubtitle: {
		color: lightColors.bodyText,
	},
	bottomBarRight: {
		flexDirection: "row",
		gap: spacing.md,
	},
	cancelButton: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
		borderRadius: scaleSize(8),
	},
	confirmButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: scaleSize(8),
	},
	listContent: {
		paddingBottom: spacing.xl,
	},
	searchAndFilters: {
		// No flex or fixed height – content determines its size
	},
});
