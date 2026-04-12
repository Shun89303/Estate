import { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_CONTENTS } from "@/mock/contents";
import ContentCard from "@/components/home/content/ContentCard";
import EmptyState from "@/components/common/state/EmptyState";
import BackButton from "@/components/common/navigation/BackButton";
import FilterButton from "@/components/common/utils/FilterButton";
import FilterSection from "@/components/common/utils/FilterSection";
import { BodyText, PageTitle } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";

type MainFilter = "All" | "For You" | "Saved" | "Read" | "Unread";
type TypeFilter = "All" | "Articles" | "Videos";

export default function Contents() {
	const router = useRouter();
	const colors = useTheme();
	const [showMainFilters, setShowMainFilters] = useState(false);
	const [selectedMainFilter, setSelectedMainFilter] =
		useState<MainFilter>("All");
	const [selectedTypeFilter, setSelectedTypeFilter] =
		useState<TypeFilter>("All");

	// Count active main filters (excluding "All")
	const activeMainFilterCount = selectedMainFilter !== "All" ? 1 : 0;

	const filteredData = MOCK_CONTENTS.filter((item) => {
		if (selectedMainFilter === "For You" && !item.forYou) return false;
		if (selectedMainFilter === "Saved" && !item.saved) return false;
		if (selectedMainFilter === "Read" && !item.read) return false;
		if (selectedMainFilter === "Unread" && item.read) return false;
		if (selectedTypeFilter === "Articles" && item.type !== "article")
			return false;
		if (selectedTypeFilter === "Videos" && item.type !== "video") return false;
		return true;
	});

	return (
		<SafeAreaView style={[styles.container]} edges={["top"]}>
			{/* Header */}
			<View style={[styles.header, { borderBottomColor: colors.border }]}>
				<BackButton />
				<View style={styles.titleContainer}>
					<PageTitle style={styles.title}>Contents</PageTitle>
					<BodyText style={[styles.subtitle, { color: colors.textSecondary }]}>
						Guides, tips & videos for buyers
					</BodyText>
				</View>
				<FilterButton
					isOpen={showMainFilters}
					activeCount={activeMainFilterCount}
					onPress={() => setShowMainFilters((prev) => !prev)}
				/>
			</View>

			{/* Main Filters (All, For You, Saved, Read, Unread) - visible when toggled */}
			{showMainFilters && (
				<View style={styles.filterWrapper}>
					<FilterSection
						options={["All", "For You", "Saved", "Read", "Unread"]}
						selected={selectedMainFilter}
						onSelect={(value) => setSelectedMainFilter(value as MainFilter)}
						borderRadius={99}
						activeTextColor={colors.primaryGold}
						activeBgColor={colors.primaryGold + 10}
						borderWidth={1}
						activeBorderColor={colors.primaryGold + 50}
						inactiveBorderColor={colors.primaryGray + 50}
						inactiveBgColor="#FFF"
					/>
				</View>
			)}

			{/* Type Filters (always visible) */}
			<View style={styles.filterWrapper}>
				<FilterSection
					options={["All", "Articles", "Videos"]}
					selected={selectedTypeFilter}
					onSelect={(value) => setSelectedTypeFilter(value as TypeFilter)}
					borderRadius={99}
				/>
			</View>

			{/* List */}
			<FlatList
				data={filteredData}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ContentCard
						item={item}
						onPress={() => router.push(`/content/${item.id}`)}
					/>
				)}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<EmptyState title="No contents found" />}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
	},
	titleContainer: {
		flex: 1,
		alignItems: "flex-start",
		paddingHorizontal: 10,
	},
	title: {
		marginBottom: 2,
	},
	subtitle: {
		fontSize: 12,
	},
	listContainer: {
		paddingHorizontal: 30,
		paddingTop: 8,
		paddingBottom: 20,
	},
	filterWrapper: {
		paddingHorizontal: 30,
		marginTop: 12,
	},
});
