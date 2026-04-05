import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Property } from "@/stores/usePropertyStore";

interface SavedPropertyCardProps {
	property: Property & { typeLabel?: string }; // typeLabel = Buy/Sell, Room Rent, etc
	onShare?: () => void;
	onDelete?: () => void;
}

export default function SavedPropertyCard({
	property,
	onShare,
	onDelete,
}: SavedPropertyCardProps) {
	return (
		<View style={styles.card}>
			{/* Cover Image */}
			<Image source={{ uri: property.media?.[0]?.url }} style={styles.image} />

			{/* Info Container */}
			<View style={styles.infoContainer}>
				{/* Share Button */}
				<TouchableOpacity style={styles.shareBtn} onPress={onShare}>
					<Ionicons name="share-social-outline" size={20} color="#333" />
				</TouchableOpacity>

				{/* Type, Name, Location */}
				<View style={styles.textStack}>
					{property.typeLabel && (
						<Text style={styles.type}>{property.typeLabel}</Text>
					)}
					<Text style={styles.name}>{property.name}</Text>
					<Text style={styles.location}>{property.location_text}</Text>
				</View>

				{/* Price and Bedroom/Bathroom */}
				<View style={styles.bottomRow}>
					<Text style={styles.price}>฿{property.price?.toLocaleString()}</Text>
					<View style={styles.bedBath}>
						{property.bedrooms && (
							<Text style={styles.bedBathText}>{property.bedrooms} bd</Text>
						)}
						{property.bathrooms && (
							<Text style={styles.bedBathText}>{property.bathrooms} ba</Text>
						)}
						<TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
							<MaterialIcons name="delete-outline" size={20} color="#333" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 8,
		marginVertical: 8,
		marginHorizontal: 16,
		overflow: "hidden",
		elevation: 2, // shadow for android
	},

	image: {
		width: 100,
		height: 100,
	},

	infoContainer: {
		flex: 1,
		padding: 8,
		justifyContent: "space-between",
	},

	shareBtn: {
		position: "absolute",
		top: 8,
		right: 8,
		zIndex: 1,
	},

	textStack: {
		marginRight: 32, // leave space for share button
	},

	type: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#555",
	},

	name: {
		fontSize: 14,
		fontWeight: "600",
	},

	location: {
		fontSize: 12,
		color: "#888",
	},

	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	price: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#222",
	},

	bedBath: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	bedBathText: {
		fontSize: 12,
		color: "#555",
	},

	deleteBtn: {
		marginLeft: 8,
	},
});
