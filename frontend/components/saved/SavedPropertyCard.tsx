import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MapPin, Bed, Bath, Trash2, Share2 } from "lucide-react-native";
import {
	BodyText,
	NormalTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";
import { Property } from "@/mock/savedProperties";

interface SavedPropertyCardProps {
	property: Property;
	onDelete: () => void;
	onShare: () => void;
}

export default function SavedPropertyCard({
	property,
	onDelete,
	onShare,
}: SavedPropertyCardProps) {
	const router = useRouter();
	const colors = useTheme();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/buySell/${property.id}`)}
			activeOpacity={0.8}
			style={globalStyles.shadows}
		>
			<View style={styles.card}>
				<View style={styles.imageContainer}>
					<Image
						source={{
							uri:
								property.media?.[0]?.url ?? "https://via.placeholder.com/100",
						}}
						style={styles.image}
					/>
				</View>

				<View style={styles.infoContainer}>
					{/* Top row: type label + share button */}
					<View style={styles.topRow}>
						<View
							style={[
								styles.typeBadge,
								{ backgroundColor: colors.secondaryGold },
							]}
						>
							<SmallTitle
								style={{ color: colors.primaryGold, fontWeight: "600" }}
							>
								{property.typeLabel}
							</SmallTitle>
						</View>
						<TouchableOpacity onPress={onShare}>
							<Share2 size={18} color="#666" />
						</TouchableOpacity>
					</View>

					{/* Property name */}
					<NormalTitle numberOfLines={1} style={styles.name}>
						{property.name}
					</NormalTitle>

					{/* Location */}
					<View style={styles.locationRow}>
						<MapPin size={12} color={colors.textSecondary} />
						<BodyText style={styles.locationText} numberOfLines={1}>
							{property.location_text}
						</BodyText>
					</View>

					{/* Bottom row: price + bed/bath + delete */}
					<View style={styles.bottomRow}>
						<NormalTitle
							style={{ color: colors.primaryGold, fontWeight: "bold" }}
						>
							฿{(property.price ?? 0).toLocaleString()}
						</NormalTitle>

						<View style={styles.iconsRow}>
							{property.bedrooms && property.bedrooms > 0 && (
								<View style={styles.iconItem}>
									<Bed size={14} color="#555" />
									<BodyText>{property.bedrooms}</BodyText>
								</View>
							)}
							{property.bathrooms && property.bathrooms > 0 && (
								<View style={styles.iconItem}>
									<Bath size={14} color="#555" />
									<BodyText>{property.bathrooms}</BodyText>
								</View>
							)}
							<TouchableOpacity onPress={onDelete}>
								<Trash2 size={18} color="#f33" />
							</TouchableOpacity>
						</View>
					</View>
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
		marginHorizontal: 16,
		marginVertical: 8,
		overflow: "hidden",
		padding: 15,
	},
	imageContainer: {
		width: 110,
		alignSelf: "stretch",
	},
	image: {
		flex: 1,
		width: "100%",
		borderRadius: 8,
		resizeMode: "cover",
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	typeBadge: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 99,
	},
	name: {
		marginBottom: 4,
		lineHeight: 20,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		gap: 4,
	},
	locationText: {
		flexShrink: 1,
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	iconItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
});
