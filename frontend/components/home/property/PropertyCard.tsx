// components/PropertyCard.tsx
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react-native";
import { Property } from "@/mock/buySell";
import {
	BodyText,
	NormalTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import globalStyles from "@/styles/styles";
import { useTheme } from "@/hooks/useTheme";

interface PropertyCardProps {
	property: Property;
	style?: object;
}

export default function PropertyCard({ property, style }: PropertyCardProps) {
	const router = useRouter();
	const colors = useTheme();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/property/buySell/${property.uniqueCode}`)}
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
					<SmallTitle
						style={{
							color: colors.primaryGold,
							textTransform: "uppercase",
						}}
					>
						{property.type}
					</SmallTitle>
					{property.isNew && (
						<View style={styles.newBadge}>
							<SmallTitle
								style={{
									color: colors.primaryRed,
									fontSize: 10,
									fontWeight: "bold",
								}}
							>
								• NEW
							</SmallTitle>
						</View>
					)}
				</View>

				{/* Title */}
				<NormalTitle numberOfLines={1} style={styles.title}>
					{property.title}
				</NormalTitle>

				{/* Address with icon */}
				<View style={styles.locationRow}>
					<MapPin size={12} color={colors.primaryGold} />
					<BodyText style={styles.address} numberOfLines={1}>
						{property.location.address}
					</BodyText>
				</View>

				{/* Bottom row: specs + price */}
				<View style={styles.bottomRow}>
					<View style={styles.specsRow}>
						<View style={styles.specItem}>
							<BedDouble size={12} color={colors.textSecondary} />
							<BodyText style={styles.specText}>{property.bedrooms}</BodyText>
						</View>
						<View style={styles.specItem}>
							<Bath size={12} color={colors.textSecondary} />
							<BodyText style={styles.specText}>{property.bathrooms}</BodyText>
						</View>
						<View style={styles.specItem}>
							<Maximize size={12} color={colors.textSecondary} />
							<BodyText style={styles.specText}>{property.areaSqm}</BodyText>
						</View>
					</View>
					<NormalTitle
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: colors.primaryGold,
						}}
					>
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
	newBadge: {
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
		marginLeft: 8,
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
	},
});
