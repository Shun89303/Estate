import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Property } from "@/stores/usePropertyStore";
import { formatPrice } from "@/utils/formatPrice";

export default function PropertyCard({ property }: { property: Property }) {
	const router = useRouter();
	const cover = property.media?.find((m: any) => m.type === "cover");

	return (
		<TouchableOpacity
			onPress={() => router.push(`/buySell/${property.id}`)}
			activeOpacity={0.8}
		>
			<View style={styles.card}>
				{/* LEFT: IMAGE */}
				{cover && (
					<Image
						// source={{ uri: `${API_BASE_URL}/${cover.url}` }}
						source={{ uri: cover.url }}
						style={styles.image}
					/>
				)}

				{/* RIGHT: INFO */}
				<View style={styles.info}>
					{/* TYPE + BADGE */}
					<View style={styles.rowTop}>
						<Text style={styles.type}>{property.type}</Text>
						{property.is_new && <Text style={styles.badge}>NEW</Text>}
					</View>

					{/* NAME */}
					<Text style={styles.name} numberOfLines={1}>
						{property.name}
					</Text>

					{/* LOCATION */}
					<Text style={styles.location} numberOfLines={1}>
						{property.location_text}
					</Text>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						{/* DETAILS */}
						<Text style={styles.details}>
							{property.bedrooms} bd • {property.bathrooms} ba • {property.area}{" "}
							m²
						</Text>

						{/* PRICE */}
						<Text style={styles.price}>
							฿{formatPrice(property.price)}
							{property.price_type === "monthly" ? "/mo" : ""}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	card: {
		flexDirection: "row", // 🔥 horizontal
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 12,
		overflow: "hidden",
	},

	image: {
		width: 120, // fixed width
		height: 120, // same → 1:1 square
	},

	info: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
	},

	rowTop: {
		flexDirection: "row",
	},

	type: {
		fontSize: 11,
		color: "#666",
	},

	badge: {
		fontSize: 11,
		backgroundColor: "#007bff",
		color: "#fff",
		paddingHorizontal: 6,
		borderRadius: 4,
	},

	name: {
		fontSize: 14,
		fontWeight: "bold",
	},

	location: {
		fontSize: 12,
		color: "#777",
	},

	details: {
		fontSize: 12,
		color: "#555",
	},

	price: {
		fontSize: 14,
		fontWeight: "bold",
	},
});
