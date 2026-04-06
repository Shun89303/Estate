import { useRouter } from "expo-router";
import { Text, Pressable, StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_CONTENTS } from "@/mock/contents";
import ContentCard from "@/components/home/content/ContentCard";
import { useState } from "react";

export default function Contents() {
	const router = useRouter();
	const [showFilters, setShowFilters] = useState(false);
	const [activeFilter, setActiveFilter] = useState<
		"all" | "forYou" | "saved" | "read" | "unread"
	>("all");

	const [activeType, setActiveType] = useState<"all" | "article" | "video">(
		"all",
	);

	const filteredContents = MOCK_CONTENTS.filter((item) => {
		// Type filter
		if (activeType !== "all" && item.type !== activeType) return false;

		// Main filter (mock logic for now)
		if (activeFilter === "read") return item.read_time; // example
		if (activeFilter === "unread") return !item.read_time;

		return true;
	});

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			<View style={styles.headerRow}>
				<View>
					<Text style={styles.title}>Contents</Text>
					<Text style={styles.subtitle}>Guides, tips & videos for buyers</Text>
				</View>

				<Pressable
					style={styles.filterButton}
					onPress={() => setShowFilters(!showFilters)}
				>
					<Text style={styles.filterText}>Filter</Text>
				</Pressable>
			</View>

			{/* Main Filters (toggle) */}
			{showFilters && (
				<View style={styles.filterRow}>
					{["all", "forYou", "saved", "read", "unread"].map((f) => (
						<Pressable
							key={f}
							style={[
								styles.filterChip,
								activeFilter === f && styles.filterChipActive,
							]}
							onPress={() => setActiveFilter(f as any)}
						>
							<Text
								style={[
									styles.filterChipText,
									activeFilter === f && styles.filterChipTextActive,
								]}
							>
								{f}
							</Text>
						</Pressable>
					))}
				</View>
			)}

			{/* Type Filters (ALWAYS visible) */}
			<View style={styles.filterRow}>
				{["all", "article", "video"].map((t) => (
					<Pressable
						key={t}
						style={[
							styles.filterChip,
							activeType === t && styles.filterChipActive,
						]}
						onPress={() => setActiveType(t as any)}
					>
						<Text
							style={[
								styles.filterChipText,
								activeType === t && styles.filterChipTextActive,
							]}
						>
							{t === "all" ? "All" : t === "article" ? "Articles" : "Videos"}
						</Text>
					</Pressable>
				))}
			</View>

			{/* List */}
			<FlatList
				data={filteredContents}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ContentCard
						content={item}
						showReadTime={true}
						onPress={() => router.push(`/content/${item.type}/${item.id}`)}
					/>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.list}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},

	back: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 12,
	},

	title: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 4,
	},

	subtitle: {
		fontSize: 13,
		color: "#666",
		marginBottom: 16,
	},

	list: {
		paddingBottom: 20,
	},

	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},

	filterButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 6,
	},

	filterText: {
		fontSize: 12,
		fontWeight: "500",
	},

	filterRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 12,
		gap: 8,
	},

	filterChip: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#ccc",
	},

	filterChipActive: {
		backgroundColor: "#000",
		borderColor: "#000",
	},

	filterChipText: {
		fontSize: 11,
		color: "#333",
	},

	filterChipTextActive: {
		color: "#fff",
	},
});
