import { useState } from "react";
import {
	View,
	Text,
	Pressable,
	FlatList,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_CONTENTS } from "@/mock/contents";
import ContentCard from "@/components/home/content/ContentCard";

type MainFilter = "All" | "For You" | "Saved" | "Read" | "Unread";
type TypeFilter = "All" | "Articles" | "Videos";

export default function Contents() {
	const router = useRouter();
	const [showMainFilters, setShowMainFilters] = useState(false);
	const [selectedMainFilter, setSelectedMainFilter] =
		useState<MainFilter>("All");
	const [selectedTypeFilter, setSelectedTypeFilter] =
		useState<TypeFilter>("All");

	// Filter the data
	const filteredData = MOCK_CONTENTS.filter((item) => {
		// Main filter
		if (selectedMainFilter === "For You" && !item.forYou) return false;
		if (selectedMainFilter === "Saved" && !item.saved) return false;
		if (selectedMainFilter === "Read" && !item.read) return false;
		if (selectedMainFilter === "Unread" && item.read) return false;

		// Type filter
		if (selectedTypeFilter === "Articles" && item.type !== "article")
			return false;
		if (selectedTypeFilter === "Videos" && item.type !== "video") return false;

		return true;
	});

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			{/* Header */}
			<View style={styles.header}>
				<Pressable onPress={() => router.back()} style={styles.backButton}>
					<Ionicons name="arrow-back" size={24} color="#333" />
				</Pressable>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Contents</Text>
					<Text style={styles.subtitle}>Guides, tips & videos for buyers</Text>
				</View>
				<Pressable onPress={() => setShowMainFilters(!showMainFilters)}>
					<Ionicons name="options-outline" size={24} color="#333" />
				</Pressable>
			</View>

			{/* Main Filters (All, For You, Saved, Read, Unread) */}
			{showMainFilters && (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.filterScroll}
					contentContainerStyle={styles.filterContainer}
				>
					{(["All", "For You", "Saved", "Read", "Unread"] as MainFilter[]).map(
						(filter) => (
							<TouchableOpacity
								key={filter}
								style={[
									styles.filterChip,
									selectedMainFilter === filter && styles.filterChipActive,
								]}
								onPress={() => setSelectedMainFilter(filter)}
							>
								<Text
									style={[
										styles.filterChipText,
										selectedMainFilter === filter &&
											styles.filterChipTextActive,
									]}
								>
									{filter}
								</Text>
							</TouchableOpacity>
						),
					)}
				</ScrollView>
			)}

			{/* Type Filters (All, Articles, Videos) */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.filterScroll}
				contentContainerStyle={styles.filterContainer}
			>
				{(["All", "Articles", "Videos"] as TypeFilter[]).map((filter) => (
					<TouchableOpacity
						key={filter}
						style={[
							styles.filterChip,
							selectedTypeFilter === filter && styles.filterChipActive,
						]}
						onPress={() => setSelectedTypeFilter(filter)}
					>
						<Text
							style={[
								styles.filterChipText,
								selectedTypeFilter === filter && styles.filterChipTextActive,
							]}
						>
							{filter}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

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
				ListEmptyComponent={
					<Text style={styles.emptyText}>No content found</Text>
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	backButton: {
		padding: 4,
	},
	titleContainer: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
	},
	subtitle: {
		fontSize: 12,
		color: "#888",
		marginTop: 2,
	},
	filterScroll: {
		flexGrow: 0,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	filterContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 8,
	},
	filterChip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#f2f2f2",
		marginRight: 8,
	},
	filterChipActive: {
		backgroundColor: "#2c6e9e",
	},
	filterChipText: {
		fontSize: 14,
		color: "#333",
	},
	filterChipTextActive: {
		color: "#fff",
		fontWeight: "500",
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 20,
	},
	card: {
		flexDirection: "row",
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	cardLeft: {
		width: 110,
		height: 110,
	},
	imageContainer: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	fileIconOverlay: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: 4,
		borderRadius: 6,
	},
	videoOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	durationBadge: {
		position: "absolute",
		bottom: 6,
		right: 6,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},
	durationText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "500",
	},
	cardRight: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
	},
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	typeText: {
		fontSize: 11,
		fontWeight: "600",
		color: "#2c6e9e",
		letterSpacing: 0.5,
		marginBottom: 4,
	},
	cardTitle: {
		fontSize: 15,
		fontWeight: "600",
		lineHeight: 20,
		flex: 1,
		marginRight: 8,
	},
	metaRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	metaText: {
		fontSize: 11,
		color: "#888",
	},
	metaDot: {
		fontSize: 11,
		color: "#888",
		marginHorizontal: 4,
	},
	emptyText: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 14,
		color: "#888",
	},
});
