// components/PropertyCard.tsx
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react-native";
import { Property } from "@/mock/buySell";
import {
	BodyText,
	NormalTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import globalStyles from "@/styles/styles";

interface PropertyCardProps {
	property: Property;
	style?: object;
}

export default function PropertyCard({ property, style }: PropertyCardProps) {
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/buySell/${property.id}`)}
			activeOpacity={0.8}
			style={[styles.card, style]}
		>
			{/* Left: Square Image */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: property.media.cover }} style={styles.image} />
			</View>

			{/* Right: Info */}
			<View style={styles.infoContainer}>
				{/* Top row: type + new badge */}
				<View style={styles.headerRow}>
					<SmallTitle style={styles.typeText}>{property.type}</SmallTitle>
					{property.isNew && (
						<View style={styles.newBadge}>
							<Text style={styles.newText}>NEW</Text>
						</View>
					)}
				</View>

				{/* Title */}
				<NormalTitle numberOfLines={2} style={styles.title}>
					{property.title}
				</NormalTitle>

				{/* Address with icon */}
				<View style={styles.locationRow}>
					<MapPin size={12} color="#da9a0fff" />
					<BodyText style={styles.address} numberOfLines={1}>
						{property.location.address}
					</BodyText>
				</View>

				{/* Bottom row: specs + price */}
				<View style={styles.bottomRow}>
					<View style={styles.specsRow}>
						<View style={styles.specItem}>
							<BedDouble size={12} color="#555" />
							<Text style={styles.specText}>{property.bedrooms}</Text>
						</View>
						<View style={styles.specItem}>
							<Bath size={12} color="#555" />
							<Text style={styles.specText}>{property.bathrooms}</Text>
						</View>
						<View style={styles.specItem}>
							<Maximize size={12} color="#555" />
							<Text style={styles.specText}>{property.areaSqm} m²</Text>
						</View>
					</View>
					<NormalTitle style={styles.price}>
						฿{property.price.toLocaleString()}
					</NormalTitle>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 12,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	imageContainer: {
		width: 130,
		alignSelf: "stretch",
	},
	image: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	typeText: {
		color: "#2c6e9e",
		textTransform: "capitalize",
	},
	newBadge: {
		backgroundColor: "#da9a0fff",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
		marginLeft: 8,
	},
	newText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	title: {
		marginBottom: 4,
		lineHeight: 20,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	address: {
		marginLeft: 4,
		color: "#666",
		fontSize: 12,
		flexShrink: 1,
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	specsRow: {
		flexDirection: "row",
		gap: 8,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	specText: {
		fontSize: 12,
		color: "#555",
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
	},
});
