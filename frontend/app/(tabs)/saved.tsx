// app/(tabs)/saved.tsx
import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_SAVED_PROPERTIES } from "@/mock/savedProperties";
import { Ionicons } from "@expo/vector-icons";

export default function Saved() {
	const router = useRouter();
	const [savedProperties, setSavedProperties] = useState(MOCK_SAVED_PROPERTIES);

	const handleDelete = (id: number) => {
		setSavedProperties((prev) => prev.filter((p) => p.id !== id));
	};

	const handleShare = (property: (typeof MOCK_SAVED_PROPERTIES)[0]) => {
		// placeholder, implement share logic later
		console.log("Share", property.name);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"<"}</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Saved Properties</Text>
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
					renderItem={({ item }) => (
						<PropertyCard
							property={item}
							onDelete={() => handleDelete(item.id!)}
							onShare={() => handleShare(item)}
						/>
					)}
					contentContainerStyle={{ paddingBottom: 16 }}
				/>
			)}
		</SafeAreaView>
	);
}

/* ---------------- PROPERTY CARD ---------------- */
function PropertyCard({
	property,
	onDelete,
	onShare,
}: {
	property: (typeof MOCK_SAVED_PROPERTIES)[0];
	onDelete: () => void;
	onShare: () => void;
}) {
	return (
		<View style={cardStyles.container}>
			{/* Cover Image */}
			<Image
				source={{
					uri: property.media?.[0]?.url ?? "https://via.placeholder.com/100",
				}}
				style={cardStyles.image}
			/>

			{/* Info Container */}
			<View style={cardStyles.infoContainer}>
				{/* Share button */}
				<TouchableOpacity style={cardStyles.shareBtn} onPress={onShare}>
					<Ionicons name="share-social-outline" size={20} color="#333" />
				</TouchableOpacity>

				{/* Type */}
				<Text style={cardStyles.typeLabel}>{property.typeLabel}</Text>

				{/* Name */}
				<Text style={cardStyles.name}>{property.name}</Text>

				{/* Location */}
				<Text style={cardStyles.location}>{property.location_text}</Text>

				{/* Price, Bedrooms/Bathrooms */}
				<View style={cardStyles.bottomRow}>
					{/* Price */}
					<Text style={cardStyles.price}>
						฿{(property.price ?? 0).toLocaleString()}
					</Text>
					<View style={cardStyles.bedBathRow}>
						{property.bedrooms && (
							<Text style={cardStyles.bedBath}>{property.bedrooms} 🛏</Text>
						)}
						{property.bathrooms && (
							<Text style={cardStyles.bedBath}>{property.bathrooms} 🛁</Text>
						)}
						<TouchableOpacity onPress={onDelete}>
							<Ionicons name="trash-outline" size={20} color="#f33" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	title: { fontSize: 18, fontWeight: "bold" },
	emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
	emptyText: { fontSize: 16, color: "#888" },
});

const cardStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		marginHorizontal: 16,
		marginVertical: 8,
		overflow: "hidden",
		elevation: 1,
	},
	image: { width: 100, height: 100 },
	infoContainer: { flex: 1, padding: 8, justifyContent: "space-between" },
	shareBtn: { position: "absolute", top: 8, right: 8 },
	typeLabel: { fontSize: 12, color: "#666", fontWeight: "600" },
	name: { fontSize: 16, fontWeight: "bold", marginVertical: 2 },
	location: { fontSize: 12, color: "#666" },
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 4,
	},
	price: { fontSize: 14, fontWeight: "bold", color: "#000" },
	bedBathRow: { flexDirection: "row", alignItems: "center", gap: 6 },
	bedBath: { fontSize: 12, color: "#666", marginRight: 4 },
});
