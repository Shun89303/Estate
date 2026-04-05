import { useMemo, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePropertyStore } from "@/stores/usePropertyStore";
import { useFetchProperties } from "@/hooks/useFetchProperties";
import PropertyCard from "@/components/home/property/PropertyCard";
import { useRouter } from "expo-router";

export default function Search() {
	const { properties, loading } = usePropertyStore();
	useFetchProperties();

	const router = useRouter();

	const [viewMode, setViewMode] = useState<"list" | "map">("list");

	const buyProperties = useMemo(() => {
		return properties.filter((p) => p.listing_type === "buy" && p.agent_id);
	}, [properties]);

	if (loading) return <ActivityIndicator size="large" />;
	// if (error) return <Text>{error}</Text>;

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"<"}</Text>
				</TouchableOpacity>

				<TextInput placeholder="Search..." style={styles.searchBar} />

				<TouchableOpacity>
					<Text>Filter</Text>
				</TouchableOpacity>
			</View>

			{/* CATEGORY BUTTONS */}
			<View style={styles.categories}>
				{["Buy/Sell", "Room Rent", "Owner Direct", "Off-Plan", "Business"].map(
					(item) => (
						<TouchableOpacity key={item} style={styles.categoryBtn}>
							<Text>{item}</Text>
						</TouchableOpacity>
					),
				)}
			</View>

			{/* TOGGLE */}
			<View style={styles.toggleRow}>
				<TouchableOpacity onPress={() => setViewMode("list")}>
					<Text style={viewMode === "list" ? styles.active : undefined}>
						List
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setViewMode("map")}>
					<Text style={viewMode === "map" ? styles.active : undefined}>
						Map
					</Text>
				</TouchableOpacity>
			</View>

			{/* CONTENT */}
			{viewMode === "list" ? (
				<FlatList
					data={buyProperties}
					keyExtractor={(item) => item.id!.toString()}
					renderItem={({ item }) => <PropertyCard property={item} />}
				/>
			) : (
				<View style={styles.map}>
					<Text>Map View (implement later)</Text>
				</View>
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

	categories: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
	},

	categoryBtn: {
		padding: 6,
		backgroundColor: "#eee",
		borderRadius: 6,
	},

	toggleRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 20,
		paddingVertical: 10,
	},

	active: {
		fontWeight: "bold",
		textDecorationLine: "underline",
	},

	card: {
		padding: 16,
		borderBottomWidth: 1,
	},

	map: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
