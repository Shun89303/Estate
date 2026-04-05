import { View, Text, StyleSheet } from "react-native";
import { Property } from "@/stores/usePropertyStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatPrice } from "@/utils/formatPrice";

export default function PropertyInfo({ property }: { property: Property }) {
	return (
		<View style={styles.container}>
			{/* PRICE */}
			<Text style={styles.price}>
				฿{formatPrice(property.price)}{" "}
				{property.price_type === "monthly" ? "/mo" : ""}
			</Text>

			{/* TYPE + NEW BADGE */}
			<View style={styles.typeRow}>
				<Text style={styles.type}>{property.type}</Text>
				{property.is_new && <Text style={styles.badge}>NEW</Text>}
			</View>

			{/* NAME */}
			<Text style={styles.name}>{property.name}</Text>

			{/* LOCATION */}
			<Text style={styles.location}>{property.location_text}</Text>

			{/* DETAILS ROW: bedrooms, bathrooms, area, floor */}
			<View style={styles.detailsRow}>
				{property.bedrooms != null && (
					<View style={styles.detailItem}>
						<MaterialCommunityIcons name="bed-outline" size={24} color="#555" />
						<Text style={styles.detailText}>{property.bedrooms}</Text>
						<Text style={styles.detailLabel}>Bedrooms</Text>
					</View>
				)}

				{property.bathrooms != null && (
					<View style={styles.detailItem}>
						<MaterialCommunityIcons name="shower" size={24} color="#555" />
						<Text style={styles.detailText}>{property.bathrooms}</Text>
						<Text style={styles.detailLabel}>Bathrooms</Text>
					</View>
				)}

				{property.area != null && (
					<View style={styles.detailItem}>
						<MaterialCommunityIcons
							name="ruler-square"
							size={24}
							color="#555"
						/>
						<Text style={styles.detailText}>{property.area} m²</Text>
						<Text style={styles.detailLabel}>Area</Text>
					</View>
				)}

				{property.floor_current != null && property.floor_total != null && (
					<View style={styles.detailItem}>
						<MaterialCommunityIcons name="floor-plan" size={24} color="#555" />
						<Text style={styles.detailText}>
							{property.floor_current}/{property.floor_total}
						</Text>
						<Text style={styles.detailLabel}>Floor</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16 },
	price: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
	typeRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
	type: { fontSize: 12, color: "#666", marginRight: 8 },
	badge: {
		fontSize: 12,
		backgroundColor: "#007bff",
		color: "#fff",
		paddingHorizontal: 6,
		borderRadius: 4,
	},
	name: { fontSize: 16, fontWeight: "bold", marginBottom: 2 },
	location: { fontSize: 14, color: "#777", marginBottom: 8 },

	detailsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	detailItem: {
		alignItems: "center",
	},
	detailText: { fontSize: 14, color: "#555", marginTop: 4 },
	detailLabel: { fontSize: 12, color: "#777", marginTop: 2 },
});
