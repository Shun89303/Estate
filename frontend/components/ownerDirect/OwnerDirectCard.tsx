import { useTheme } from "@/hooks/useTheme";
import { Property } from "@/mock/ownerDirect";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { BodyText, NormalTitle, SmallTitle } from "../atoms/Typography";
import {
	Bath,
	BedDouble,
	Coins,
	Lock,
	LockOpen,
	MapPin,
	Maximize,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function OwnerDirectCard({
	property,
	isUnlocked,
	onPress,
}: {
	property: Property;
	isUnlocked: boolean;
	onPress: () => void;
}) {
	const colors = useTheme();

	return (
		<Pressable onPress={onPress} style={styles.card}>
			{/* Left: Square Image with OWNER badge */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: property.media.cover }} style={styles.image} />
				<View
					style={[
						styles.imageNewBadge,
						{ backgroundColor: colors.primaryGold },
					]}
				>
					<SmallTitle style={styles.imageNewBadgeText}>OWNER</SmallTitle>
				</View>
			</View>

			{/* Right: Info */}
			<View style={styles.infoContainer}>
				<View style={styles.headerRow}>
					<SmallTitle
						style={{ color: colors.primaryGold, textTransform: "uppercase" }}
					>
						{property.type}
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

				{/* Specs row (horizontal) */}
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
						<BodyText style={styles.specText}>{property.areaSqm} sqm</BodyText>
					</View>
				</View>

				{/* Bottom row: unlock info + price */}
				<View style={styles.bottomRow}>
					<View style={styles.unlockRow}>
						{isUnlocked ? (
							<>
								<LockOpen size={12} color={colors.primaryGreen} />
								<BodyText
									style={{ color: colors.primaryGreen, flexShrink: 1 }}
									numberOfLines={1}
								>
									{property.owner.phone}
								</BodyText>
							</>
						) : (
							<View
								style={[
									styles.unlockPill,
									{
										backgroundColor: colors.darkGold,
									},
								]}
							>
								<Lock size={12} color={colors.primaryGold} />
								<Coins
									size={12}
									color={colors.primaryGold}
									style={{ marginLeft: 2 }}
								/>
								<BodyText
									style={{
										color: colors.primaryGold,
										fontSize: 11,
										marginLeft: 4,
									}}
									numberOfLines={1}
								>
									{property.unlockCoins} to unlock
								</BodyText>
							</View>
						)}
					</View>
					<NormalTitle
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: colors.primaryGold,
							flexShrink: 0,
							marginLeft: 8,
						}}
						numberOfLines={1}
					>
						฿{property.price.toLocaleString()}
					</NormalTitle>
				</View>
			</View>
		</Pressable>
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
	specsRow: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 8,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	specText: {
		fontSize: 12,
	},
	unlockPill: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 6,
		paddingVertical: 4,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},
	unlockRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		flexShrink: 1,
		flexWrap: "wrap",
	},
});
