import { useState, useMemo, useRef } from "react";
import {
	View,
	StyleSheet,
	Pressable,
	FlatList,
	TouchableOpacity,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
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
import { PropertyMap } from "@/components/common/utils/PropertyMap";
import BuyBusinessCard from "@/components/buyBusiness/BuyBusinessCard";
import { useCoinBalance } from "@/components/coin/useCoinBalance";
import { useUserStore } from "@/stores/userStore";

// Data and types
import { MOCK_BUY_BUSINESS, BuyBusiness } from "@/mock/buyBusiness";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import {
	ChartColumn,
	Coins,
	EyeOff,
	Lock,
	LockOpen,
	GitCompareArrows,
} from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import ClearFiltersButton from "@/components/common/utils/ClearFiltersButton";
import { useShortlist } from "@/components/shortlist/useShortlist";
import SubTitle from "@/components/common/typography/SubTitle";
import formatPriceShort from "@/utils/formatPriceShort";
import BuyBusinessUnlockedCard from "@/components/buyBusiness/BuyBusinessUnlockedCard";
import globalStyles from "@/styles/styles";
import { getBestValue, rows } from "@/components/buyBusiness/compare/utils";

export default function BuyBusinessPage() {
	const router = useRouter();
	// coin ui
	const {
		CoinButton,
		CoinBottomSheet,
		closeSheet: closeCoin,
	} = useCoinBalance();
	// coin store
	const { coins: coinBalance, deductCoins } = useUserStore();
	// shortlist ui
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
	// compare mode
	const [isCompareMode, setCompareMode] = useState(false);
	const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
	const compareSheetRef = useRef<BottomSheetModal>(null);
	// compare sheet
	const [showCompareSheet, setShowCompareSheet] = useState(false);
	const [comparingBusinesses, setComparingBusinesses] = useState<BuyBusiness[]>(
		[],
	);
	const slideAnim = useRef(new Animated.Value(0)).current; // 0 = hidden, 1 = visible
	const { height: screenHeight } = Dimensions.get("window");

	// compare sheet animation
	const openCompareSheet = (businesses: BuyBusiness[]) => {
		setComparingBusinesses(businesses);
		setShowCompareSheet(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const closeCompareSheet = () => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setShowCompareSheet(false));
	};

	// Unlock state
	const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
	const unlockedBusinesses = useMemo(() => {
		return MOCK_BUY_BUSINESS.filter((item) =>
			unlockedIds.includes(item.uniqueCode),
		);
	}, [unlockedIds]);
	const [selectedProperty, setSelectedProperty] = useState<BuyBusiness | null>(
		null,
	);
	const unlockModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["70%"], []);

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
					router.push(`/`);
				} else {
					setSelectedProperty(item);
					unlockModalRef.current?.present();
				}
			},
		}));
	}, [filteredData, unlockedIds]);

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

	// Render the header content for the main FlatList
	const renderHeader = () => (
		<>
			<View style={{ backgroundColor: lightColors.background }}>
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
						setViewMode("list"); // force list view
					}
				}}
			/>

			{/* Recently Unlocked Section */}
			{unlockedBusinesses.length > 0 && !isCompareMode && (
				<View style={styles.recentlyUnlockedSection}>
					<View style={styles.recentlyUnlockedHeader}>
						<View style={styles.recentlyUnlockedLeft}>
							<LockOpen size={moderateScale(20)} color={lightColors.success} />
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
								onPress={() => router.push(`/`)}
							/>
						)}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.recentlyUnlockedList}
					/>
				</View>
			)}
		</>
	);

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
						ListHeaderComponent={renderHeader}
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
						<View style={styles.mapTopContent}>{renderHeader()}</View>
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
										closeAllSheets();
										setSelectedProperty(item);
										unlockModalRef.current?.present();
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
					ListHeaderComponent={renderHeader}
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
								<Lock size={moderateScale(30)} color={lightColors.brand} />
							</View>
							<Title variant="page" style={styles.sheetTitle}>
								Unlock Business Info
							</Title>
							<BodyText variant="normal" style={styles.sheetSubtitle}>
								{selectedProperty.title}
							</BodyText>
						</View>

						<View style={styles.sheetBox}>
							<View>
								<View style={styles.financialHeader}>
									<ChartColumn
										size={moderateScale(15)}
										color={lightColors.brand}
									/>
									<Title variant="small" style={styles.financialTitle}>
										Financial Preview
									</Title>
								</View>
								<BodyText variant="normal">Asking Price</BodyText>
								<BodyText variant="normal">Monthly Revenue</BodyText>
								<BodyText variant="normal">Monthly Profit</BodyText>
								<BodyText variant="normal">Est. ROI</BodyText>
							</View>
							<View style={styles.financialValues}>
								<View style={styles.emptySpacer} />
								<SubTitle variant="normal" style={styles.financialValue}>
									฿{selectedProperty.price.toLocaleString()}
								</SubTitle>
								<SubTitle
									variant="normal"
									style={[
										styles.financialValue,
										{ color: lightColors.bigTitleText },
									]}
								>
									฿{formatPriceShort(selectedProperty.monthlyRevenue)}/mo
								</SubTitle>
								<SubTitle
									variant="normal"
									style={[
										styles.financialValue,
										{ color: lightColors.success },
									]}
								>
									฿{formatPriceShort(selectedProperty.monthlyProfit)}/mo
								</SubTitle>
								<SubTitle variant="normal" style={styles.financialValue}>
									{selectedProperty.roiEst}% /yr
								</SubTitle>
							</View>
						</View>

						<View style={styles.sheetBox}>
							<View>
								<BodyText variant="normal">UNLOCK TO REVEAL</BodyText>
								<BodyText variant="normal">Full Address</BodyText>
								<BodyText variant="normal">Owner Contact</BodyText>
							</View>
							<View style={styles.revealValues}>
								<View style={styles.emptySpacer} />
								<View style={styles.hiddenRow}>
									<EyeOff
										size={moderateScale(12)}
										color={lightColors.bigTitleText}
									/>
									<Title variant="small" style={styles.hiddenText}>
										Hidden
									</Title>
								</View>
								<View style={styles.hiddenRow}>
									<EyeOff
										size={moderateScale(12)}
										color={lightColors.bigTitleText}
									/>
									<Title variant="small" style={styles.hiddenText}>
										Hidden
									</Title>
								</View>
							</View>
						</View>

						<View style={[styles.sheetBox, styles.sheetBoxTransparent]}>
							<View>
								<BodyText variant="normal">Cost</BodyText>
								<BodyText variant="normal">Your Balance</BodyText>
							</View>
							<View style={styles.costValues}>
								<View style={styles.hiddenRow}>
									<Coins size={moderateScale(12)} color={lightColors.brand} />
									<SubTitle variant="normal" style={{ marginBottom: 0 }}>
										{selectedProperty.unlockCoins} Coins
									</SubTitle>
								</View>
								<View style={styles.hiddenRow}>
									<Coins size={moderateScale(12)} color={lightColors.brand} />
									<Title variant="small" style={{ marginBottom: 0 }}>
										{coinBalance} coins
									</Title>
								</View>
							</View>
						</View>

						<Pressable
							style={[styles.unlockBtn, { backgroundColor: lightColors.brand }]}
							onPress={handleUnlock}
						>
							<LockOpen size={moderateScale(12)} color="#fff" />
							<BodyText variant="normal" style={styles.unlockBtnText}>
								Unlock for {selectedProperty.unlockCoins} Coins
							</BodyText>
						</Pressable>
					</BottomSheetView>
				)}
			</BottomSheetModal>

			<ShortlistBottomSheet />
			<CoinBottomSheet />
			{showCompareSheet && (
				<>
					{/* Backdrop */}
					<TouchableWithoutFeedback onPress={closeCompareSheet}>
						<Animated.View
							style={[
								styles.backdrop,
								{
									opacity: slideAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [0, 0.5],
									}),
								},
							]}
						/>
					</TouchableWithoutFeedback>

					{/* Sheet Container */}
					<Animated.View
						style={[
							styles.sheetContainer,
							{
								transform: [
									{
										translateY: slideAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [screenHeight, 0],
										}),
									},
								],
								height: screenHeight * 0.85,
							},
						]}
					>
						<View style={styles.sheetHandle} />
						<FlatList
							data={rows}
							keyExtractor={(item) => item.label}
							renderItem={({ item }) => {
								const rowValues = comparingBusinesses.map((b) =>
									item.key === "type"
										? (b[item.key as keyof BuyBusiness] as string)
										: (b[item.key as keyof BuyBusiness] as number),
								);
								const numericValues = rowValues.filter(
									(v): v is number => typeof v === "number",
								);
								const best = item.best
									? getBestValue(numericValues, item.best)
									: null;

								return (
									<View style={styles.attributeCard}>
										<BodyText variant="small" style={styles.attributeTitle}>
											{item.label}
										</BodyText>
										<View style={styles.valuesRow}>
											{rowValues.map((val, idx) => {
												const numericVal =
													typeof val === "number"
														? val
														: parseFloat(val as string);
												const isBest =
													best !== null && item.best && numericVal === best;
												return (
													<View key={idx} style={styles.businessColumn}>
														<BodyText
															variant="normal"
															style={[
																styles.valueText,
																isBest ? styles.bestValue : null,
															]}
														>
															{item.format(val as string | number)}
														</BodyText>
														{isBest && (
															<BodyText
																variant="small"
																style={styles.bestBadge}
															>
																Best
															</BodyText>
														)}
													</View>
												);
											})}
										</View>
									</View>
								);
							}}
							ListHeaderComponent={
								<>
									<View style={styles.compareHeader}>
										<View style={styles.titleContainer}>
											<GitCompareArrows
												size={moderateScale(24)}
												color={lightColors.brand}
											/>
											<Title variant="page" style={styles.compareTitle}>
												Compare Businesses
											</Title>
										</View>
									</View>
									<View style={styles.headerRow}>
										{comparingBusinesses.map((biz) => (
											<View key={biz.uniqueCode} style={styles.businessColumn}>
												<Image
													source={{ uri: biz.coverImage }}
													style={styles.image}
												/>
												<Title
													variant="small"
													style={styles.businessName}
													numberOfLines={2}
												>
													{biz.title}
												</Title>
												<BodyText
													variant="small"
													style={styles.businessLocation}
													numberOfLines={1}
												>
													{biz.location}
												</BodyText>
											</View>
										))}
									</View>
								</>
							}
							ListFooterComponent={
								<Pressable
									style={styles.doneButton}
									onPress={closeCompareSheet}
								>
									<Title variant="normal" style={{ marginBottom: 0 }}>
										Done
									</Title>
								</Pressable>
							}
							showsVerticalScrollIndicator
							contentContainerStyle={styles.listContent}
						/>
					</Animated.View>
				</>
			)}
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
	sheetHeader: {
		alignItems: "center",
	},
	lockIconContainer: {
		backgroundColor: lightColors.brandBG,
		padding: spacing.lg,
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
		backgroundColor: lightColors.mutedBackgroundWeaker,
		padding: spacing.md,
		borderRadius: scaleSize(10),
	},
	sheetBoxTransparent: {
		backgroundColor: "transparent",
	},
	financialHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	financialTitle: {
		marginBottom: 0,
	},
	financialValues: {
		alignItems: "flex-end",
	},
	revealValues: {
		alignItems: "flex-end",
	},
	costValues: {
		alignItems: "flex-end",
	},
	emptySpacer: {
		height: scaleSize(24),
	},
	hiddenRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(5),
	},
	hiddenText: {
		marginBottom: 0,
	},
	financialValue: {
		marginBottom: 0,
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
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000",
	},
	sheetContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: lightColors.background,
		borderTopLeftRadius: scaleSize(20),
		borderTopRightRadius: scaleSize(20),
		...globalStyles.shadows,
	},
	sheetHandle: {
		width: scaleSize(40),
		height: scaleSize(4),
		backgroundColor: lightColors.mutedBorder,
		borderRadius: scaleSize(2),
		alignSelf: "center",
		marginTop: spacing.sm,
		marginBottom: spacing.md,
	},
	sheetContent: {
		flex: 1,
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.md,
	},
	compareHeader: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-start",
		marginBottom: spacing.md,
		marginHorizontal: spacing.xl,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	compareTitle: {
		marginBottom: 0,
	},
	attributeCard: {
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		padding: spacing.md,
		marginBottom: spacing.md,
		marginHorizontal: spacing.md,
		...globalStyles.shadows,
	},
	attributeTitle: {
		fontWeight: "bold",
		marginBottom: spacing.sm,
		color: lightColors.bigTitleText,
		textAlign: "left",
	},
	valuesRow: {
		flexDirection: "row",
	},
	valueText: {
		textAlign: "center",
		color: lightColors.bigTitleText,
	},
	bestValue: {
		fontWeight: "700",
		color: lightColors.success,
	},
	bestBadge: {
		textAlign: "center",
		color: lightColors.success,
		fontWeight: "600",
		marginTop: scaleSize(2),
	},
	doneButton: {
		backgroundColor: lightColors.background,
		paddingVertical: spacing.md,
		marginHorizontal: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		marginVertical: spacing.md,
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
	},
	headerRow: {
		flexDirection: "row",
		marginBottom: spacing.md,
		paddingBottom: spacing.sm,
		paddingHorizontal: spacing.md,
		borderBottomWidth: scaleSize(1),
		borderBottomColor: lightColors.mutedBorder,
	},
	businessColumn: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: spacing.xs,
	},
	image: {
		width: scaleSize(100),
		height: scaleSize(80),
		borderRadius: scaleSize(8),
		marginBottom: spacing.sm,
	},
	businessName: {
		textAlign: "center",
		marginBottom: scaleSize(4),
	},
	businessLocation: {
		textAlign: "center",
		color: lightColors.bodyText,
	},
	listContent: {
		paddingBottom: spacing.xl,
	},
});
