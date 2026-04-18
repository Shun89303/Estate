import { useState, useMemo, useRef } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSavedPropertiesStore } from "@/stores/savedPropertiesStore";
import SavedPropertyCard from "@/components/saved/SavedPropertyCard";
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import FilterSection from "@/components/common/utils/FilterSection";
import { Heart, ArrowUpDown } from "lucide-react-native";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";
import { useAuthStore } from "@/stores/authStore";

export default function SavedPropertiesScreen() {
	const { user } = useAuthStore();
	const uid = user?.uid;
	const { items, removeSaved } = useSavedPropertiesStore();
	const [selectedTypeFilter, setSelectedTypeFilter] = useState("All");
	const [selectedSortFilter, setSelectedSortFilter] =
		useState("Recently Saved");
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const sortButtonRef = useRef<View>(null);
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

	// Map category to display group
	const getCategoryGroup = (category: string): string => {
		switch (category) {
			case "buySell":
			case "ownerDirect":
				return "Property";
			case "roomRent":
				return "Room";
			case "business":
			case "buyBusiness":
				return "Business";
			case "offPlan":
				return "Off-Plan";
			default:
				return "Other";
		}
	};

	const typeFilterOptions = ["All", "Property", "Room", "Business", "Off-Plan"];
	const sortOptions = [
		"Recently Saved",
		"Price: Low → High",
		"Price: High → Low",
	];

	// Count items per type filter (excluding "All")
	const typeCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		typeFilterOptions.forEach((opt) => {
			if (opt !== "All") counts[opt] = 0;
		});
		items.forEach((item) => {
			const group = getCategoryGroup(item.category);
			if (counts[group] !== undefined) counts[group]++;
		});
		return counts;
	}, [items]);

	// Filter and sort items
	const filteredAndSortedItems = useMemo(() => {
		let filtered = items;
		if (selectedTypeFilter !== "All") {
			filtered = items.filter((item) => {
				const group = getCategoryGroup(item.category);
				return group === selectedTypeFilter;
			});
		}

		// Create a copy to avoid mutating the original array
		let sorted = [...filtered];

		if (selectedSortFilter === "Recently Saved") {
			// Reverse: newest first (last saved appears at top)
			sorted = sorted.reverse();
		} else if (selectedSortFilter === "Price: Low → High") {
			sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
		} else if (selectedSortFilter === "Price: High → Low") {
			sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
		}

		return sorted;
	}, [items, selectedTypeFilter, selectedSortFilter]);

	const handleDelete = async (uniqueCode: string) => {
		if (uid) await removeSaved(uniqueCode, uid);
	};

	const handleShare = (property: any) => {
		console.log("Share", property.title);
	};

	// Build display options with counts
	const typeOptionsWithCount = typeFilterOptions.map((opt) => {
		if (opt === "All") return "All";
		return `${opt} ${typeCounts[opt] || 0}`;
	});
	const selectedTypeDisplay =
		selectedTypeFilter === "All"
			? "All"
			: `${selectedTypeFilter} ${typeCounts[selectedTypeFilter] || 0}`;

	// Measure button position for dropdown
	const measureButtonPosition = () => {
		if (sortButtonRef.current) {
			sortButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
				setDropdownPosition({ top: pageY + height + 5, left: pageX });
			});
		}
	};

	const handleSortButtonPress = () => {
		if (!showSortDropdown) {
			measureButtonPosition();
		}
		setShowSortDropdown(!showSortDropdown);
	};

	const selectSortOption = (option: string) => {
		setSelectedSortFilter(option);
		setShowSortDropdown(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.leftHeader}>
					<BackButton />
					<Title variant="page" style={{ marginBottom: 0 }}>
						Saved Properties
					</Title>
				</View>
				<BodyText variant="normal" style={styles.count}>
					{items.length} saved
				</BodyText>
			</View>

			{items.length === 0 ? (
				<View style={styles.emptyContainer}>
					<View style={styles.iconCircle}>
						<Heart size={scaleSize(48)} color={lightColors.brand} />
					</View>
					<Title variant="normal" style={styles.emptyTitle}>
						No saved properties yet
					</Title>
					<BodyText variant="normal" style={styles.emptySubtext}>
						Tap the heart icon on any property to save it here.
					</BodyText>
				</View>
			) : (
				<>
					<View style={styles.filtersContainer}>
						<FilterSection
							options={typeOptionsWithCount}
							selected={selectedTypeDisplay}
							onSelect={(val) => {
								const opt = val.split(" ")[0];
								setSelectedTypeFilter(opt);
							}}
							borderRadius={99}
							inactiveTextColor={lightColors.bodyText}
						/>
						{/* Custom sort dropdown */}
						<View style={styles.sortContainer}>
							<TouchableOpacity
								ref={sortButtonRef}
								style={styles.sortButton}
								onPress={handleSortButtonPress}
								activeOpacity={0.7}
							>
								<ArrowUpDown
									size={moderateScale(16)}
									color={lightColors.bodyText}
								/>
								<BodyText variant="normal" style={styles.sortButtonText}>
									{selectedSortFilter}
								</BodyText>
							</TouchableOpacity>
						</View>
					</View>

					{/* Floating dropdown modal */}
					<Modal
						visible={showSortDropdown}
						transparent
						animationType="fade"
						onRequestClose={() => setShowSortDropdown(false)}
					>
						<Pressable
							style={styles.modalOverlay}
							onPress={() => setShowSortDropdown(false)}
						>
							<View
								style={[
									styles.dropdownContainer,
									{ top: dropdownPosition.top, left: dropdownPosition.left },
								]}
							>
								{sortOptions.map((option) => (
									<TouchableOpacity
										key={option}
										style={[
											styles.dropdownItem,
											{
												backgroundColor:
													selectedSortFilter === option
														? lightColors.brandBG
														: "transparent",
											},
										]}
										onPress={() => selectSortOption(option)}
									>
										<BodyText
											variant="normal"
											style={[
												styles.dropdownItemText,
												selectedSortFilter === option &&
													styles.dropdownItemTextSelected,
											]}
										>
											{option}
										</BodyText>
									</TouchableOpacity>
								))}
							</View>
						</Pressable>
					</Modal>

					<FlatList
						data={filteredAndSortedItems}
						keyExtractor={(item) => item.uniqueCode}
						renderItem={({ item }) => (
							<SavedPropertyCard
								property={item}
								onDelete={() => handleDelete(item.uniqueCode)}
								onShare={() => handleShare(item)}
							/>
						)}
						ListHeaderComponent={<View style={{ height: spacing.sm }} />}
						ListFooterComponent={<View style={{ height: spacing.xxl }} />}
						contentContainerStyle={styles.listContent}
					/>
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
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
		borderBottomWidth: scaleSize(1),
		borderBottomColor: lightColors.mutedBorder,
		backgroundColor: lightColors.background,
	},
	leftHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	count: {
		color: lightColors.bodyText,
		marginBottom: 0,
	},
	filtersContainer: {
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
		paddingBottom: spacing.sm,
		backgroundColor: lightColors.background,
	},
	sortContainer: {
		alignItems: "flex-start",
	},
	sortButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(6),
		borderRadius: scaleSize(20),
		gap: spacing.xs,
	},
	sortButtonText: {
		marginBottom: 0,
	},
	listContent: {
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.xl,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: spacing.xl,
	},
	iconCircle: {
		width: scaleSize(96),
		height: scaleSize(96),
		borderRadius: scaleSize(15),
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.md,
		backgroundColor: lightColors.brandBG,
	},
	emptyTitle: {
		marginBottom: spacing.sm,
	},
	emptySubtext: {
		textAlign: "center",
		color: lightColors.bodyText,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "transparent",
	},
	dropdownContainer: {
		width: "90%",
		position: "absolute",
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		paddingVertical: spacing.sm,
		minWidth: scaleSize(180),
		...globalStyles.shadows,
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
	},
	dropdownItem: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},
	dropdownItemText: {
		marginBottom: 0,
		color: lightColors.bigTitleText,
	},
	dropdownItemTextSelected: {
		color: lightColors.brand,
		fontWeight: "600",
	},
});
