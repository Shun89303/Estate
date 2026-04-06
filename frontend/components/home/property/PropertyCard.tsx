import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Property } from "@/mock/buySell";

export default function PropertyCard({ property }: { property: Property }) {
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/buySell/${property.id}`)}
			activeOpacity={0.8}
			style={styles.cardContainer}
		>
			{/* ---------------- UPPER SIDE ---------------- */}
			<View style={styles.upperSide}>
				<Image
					source={{ uri: property.media.cover }}
					style={styles.coverImage}
				/>
				{property.isNew && <Text style={styles.newBadge}>NEW</Text>}

				{/* PRICE overlay at bottom-left */}
				<View style={styles.priceContainer}>
					<Text style={styles.price}>฿{property.price.toLocaleString()}</Text>
				</View>
			</View>

			{/* ---------------- BOTTOM SIDE ---------------- */}
			<View style={styles.bottomSide}>
				<Text style={styles.title} numberOfLines={1}>
					{property.title}
				</Text>
				<Text style={styles.address} numberOfLines={1}>
					{property.location.address}
				</Text>

				<View style={styles.divider} />

				{/* Specs row */}
				<View style={styles.specsRow}>
					<Text style={styles.spec}>{property.bedrooms} bd</Text>
					<Text style={styles.spec}>{property.bathrooms} ba</Text>
					<Text style={styles.spec}>{property.areaSqm} sqm</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 16,
		overflow: "hidden",
	},

	upperSide: {
		position: "relative",
		height: 180,
	},

	coverImage: {
		width: "100%",
		height: "100%",
	},

	newBadge: {
		position: "absolute",
		top: 10,
		left: 10,
		backgroundColor: "#007bff",
		color: "#fff",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		fontSize: 12,
		fontWeight: "bold",
	},

	priceContainer: {
		position: "absolute",
		bottom: 10,
		left: 10,
		backgroundColor: "rgba(0,0,0,0.6)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},

	price: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},

	bottomSide: {
		padding: 12,
	},

	title: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 4,
	},

	address: {
		fontSize: 12,
		color: "#666",
		marginBottom: 8,
	},

	divider: {
		height: 1,
		backgroundColor: "#eee",
		marginVertical: 8,
	},

	specsRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: 10,
	},

	spec: {
		fontSize: 12,
		color: "#555",
	},
});
