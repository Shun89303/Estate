import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PropertyCard from "@/components/home/property/PropertyCard";
import { MOCK_PROPERTIES } from "@/mock/properties";

export default function Saved() {
	const router = useRouter();

	// For demo, let's assume savedProperties is a subset of MOCK_PROPERTIES
	const [savedProperties, setSavedProperties] = useState<
		typeof MOCK_PROPERTIES
	>([]); // empty array means no saved properties

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"<"}</Text>
				</TouchableOpacity>

				<Text style={styles.title}>Saved Properties</Text>

				{/* Use an empty Text component for placeholder instead of View */}
				<Text style={{ width: 24 }} />
			</View>

			{/* CONTENT */}
			{savedProperties.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No saved properties</Text>
				</View>
			) : (
				<FlatList
					data={savedProperties}
					keyExtractor={(item) => item.id!.toString()}
					renderItem={({ item }) => <PropertyCard property={item} />}
				/>
			)}
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
		borderBottomColor: "#ccc",
	},

	title: {
		fontSize: 18,
		fontWeight: "bold",
	},

	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	emptyText: {
		fontSize: 16,
		color: "#888",
	},
});
