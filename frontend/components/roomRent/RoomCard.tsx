import { useTheme } from "@/hooks/useTheme";
import { RoomRentProperty } from "@/mock/roomRent";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BodyText, NormalTitle, SmallTitle } from "../atoms/Typography";
import { Calendar, MapPin, Users } from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function RoomCard({ property }: { property: RoomRentProperty }) {
	const router = useRouter();
	const colors = useTheme();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/roomRent/${property.id}`)}
			activeOpacity={0.8}
			style={styles.card}
		>
			{/* Left: Square Image with NEW badge overlay */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: property.media.cover }} style={styles.image} />
				{property.isNew && (
					<View
						style={[
							styles.imageNewBadge,
							{
								backgroundColor: colors.primaryGold,
							},
						]}
					>
						<SmallTitle style={styles.imageNewBadgeText}>NEW</SmallTitle>
					</View>
				)}
			</View>

			{/* Right: Info */}
			<View style={styles.infoContainer}>
				<View style={styles.headerRow}>
					<SmallTitle
						style={{
							color: colors.primaryGold,
							textTransform: "uppercase",
						}}
					>
						{property.propertyType}
					</SmallTitle>
				</View>

				<NormalTitle numberOfLines={1} style={styles.title}>
					{property.title}
				</NormalTitle>

				<View style={styles.locationRow}>
					<MapPin size={12} color={colors.primaryGold} />
					<BodyText style={styles.address} numberOfLines={1}>
						{property.location.address}
					</BodyText>
				</View>

				{/* Bottom row: stacked specs + price */}
				<View style={styles.bottomRow}>
					<View style={styles.specsColumn}>
						{/* Roommate info */}
						{property.roommateInfo && (
							<View style={styles.specItem}>
								<Users size={12} color={colors.textSecondary} />
								<BodyText style={styles.specText}>
									{property.roommateInfo.occupiedSpots}/
									{property.roommateInfo.totalSpots}
								</BodyText>
							</View>
						)}
						{/* Contract months */}
						{property.price.minContractMonths && (
							<View style={styles.specItem}>
								<Calendar size={12} color={colors.textSecondary} />
								<BodyText style={styles.specText}>
									{property.price.minContractMonths} mo min
								</BodyText>
							</View>
						)}
					</View>
					<NormalTitle
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: colors.primaryGold,
						}}
					>
						฿{property.price.rent.toLocaleString()}/mo
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
		marginHorizontal: 16,
		marginBottom: 12,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	imageContainer: {
		width: 130,
		alignSelf: "stretch",
		position: "relative",
	},
	image: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
	},
	imageNewBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 99,
	},
	imageNewBadgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
		paddingVertical: 20,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
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
		alignItems: "flex-end",
	},
	specsColumn: {
		flexDirection: "column",
		gap: 4,
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
