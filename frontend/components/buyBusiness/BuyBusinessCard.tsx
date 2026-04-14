// components/buyBusiness/BuyBusinessCard.tsx
import { Image, Pressable, StyleSheet, View } from "react-native";
import BodyText from "@/components/common/typography/BodyText";
import Title from "@/components/common/typography/Title";
import SubTitle from "@/components/common/typography/SubTitle";
import {
	Calendar,
	Coins,
	Lock,
	LockOpen,
	MapPin,
	Square,
	SquareCheckBig,
	Users,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { BuyBusiness } from "@/mock/buyBusiness";
import ShortlistButton from "../shortlist/ShortlistButton";

interface Props {
	property: BuyBusiness;
	isUnlocked: boolean;
	onPress: () => void;
	isCompareMode?: boolean;
	isSelected?: boolean;
}

const getTypeEmoji = (type: BuyBusiness["type"]) => {
	switch (type) {
		case "Restaurant":
			return "🍽️";
		case "Cafe":
			return "☕";
		case "Hotel":
			return "🏨";
		case "Spa/Massage":
			return "💆";
		case "Retail":
			return "🛍️";
		case "Franchise":
			return "🏪";
		default:
			return "";
	}
};

export default function BuyBusinessCard({
	property,
	isUnlocked,
	onPress,
	isCompareMode = false,
	isSelected = false,
}: Props) {
	const typeWithEmoji = `${getTypeEmoji(property.type)} ${property.type}`;

	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.card,
				{
					borderWidth: isSelected ? 1 : 0,
					borderColor: isSelected ? lightColors.brand : "transparent",
				},
			]}
		>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: property.coverImage }}
					style={styles.image}
					blurRadius={isUnlocked ? 0 : 10}
				/>
				{/* Dark overlay for locked state */}
				{(!isUnlocked || isCompareMode) && <View style={styles.darkOverlay} />}
				{/* Type badge (always visible) */}
				<View
					style={[styles.typeBadge, { backgroundColor: lightColors.brand }]}
				>
					<SubTitle style={styles.imageBadgeText}>{typeWithEmoji}</SubTitle>
				</View>
				{/* Lock overlay (only when locked) */}
				{!isUnlocked && (
					<View style={styles.lockOverlay}>
						<View style={styles.lockCircle}>
							<Lock size={moderateScale(24)} color="#fff" />
						</View>
					</View>
				)}
				{/* Shortlist badge (only when unlocked) */}
				{isCompareMode && isUnlocked ? (
					<View style={[styles.selectionBadge]}>
						{isSelected ? (
							<SquareCheckBig
								size={moderateScale(16)}
								color={lightColors.brand}
							/>
						) : (
							<Square
								size={moderateScale(16)}
								color={lightColors.mutedBackground}
							/>
						)}
					</View>
				) : (
					isUnlocked && (
						<View style={[styles.shortListBadge, { backgroundColor: "#fff" }]}>
							<ShortlistButton
								item={{
									id: property.id,
									coverImage: property.coverImage,
									title: property.title,
									location: property.location,
									monthlyProfit: property.monthlyProfit,
									price: property.price,
								}}
							/>
						</View>
					)
				)}
			</View>

			<View style={styles.infoContainer}>
				<Title variant="small" numberOfLines={1}>
					{property.title}
				</Title>

				<View style={styles.locationRow}>
					<MapPin size={moderateScale(12)} color={lightColors.brand} />
					<BodyText variant="small" style={styles.address} numberOfLines={1}>
						{property.location}
					</BodyText>
				</View>

				<View style={styles.specsRow}>
					<View style={styles.specItem}>
						<Users size={moderateScale(12)} color={lightColors.bodyText} />
						<BodyText variant="small" style={{ marginBottom: 0 }}>
							{property.staffs} staff
						</BodyText>
					</View>
					<View style={styles.specItem}>
						<Calendar size={moderateScale(12)} color={lightColors.bodyText} />
						<BodyText variant="small" style={{ marginBottom: 0 }}>
							{property.years} yr
						</BodyText>
					</View>
				</View>

				<View style={styles.bottomRow}>
					<View style={styles.unlockRow}>
						{isUnlocked ? (
							<>
								<LockOpen
									size={moderateScale(12)}
									color={lightColors.success}
								/>
								<BodyText
									variant="small"
									style={{
										color: lightColors.success,
										flexShrink: 1,
										marginBottom: 0,
									}}
									numberOfLines={1}
								>
									Unlocked
								</BodyText>
							</>
						) : (
							<View
								style={[
									styles.unlockPill,
									{ backgroundColor: lightColors.brandBG },
								]}
							>
								<Lock size={moderateScale(12)} color={lightColors.brand} />
								<Coins
									size={moderateScale(12)}
									color={lightColors.brand}
									style={{ marginLeft: scaleSize(2) }}
								/>
								<BodyText
									variant="small"
									style={{
										color: lightColors.brand,
										marginLeft: scaleSize(4),
										marginBottom: 0,
									}}
									numberOfLines={1}
								>
									{property.unlockCoins} to unlock
								</BodyText>
							</View>
						)}
					</View>
					<SubTitle variant="normal" style={styles.price}>
						฿{property.price.toLocaleString()}
					</SubTitle>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		marginBottom: spacing.md,
		marginHorizontal: spacing.md,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	imageContainer: {
		width: scaleSize(130),
		alignSelf: "stretch",
		position: "relative",
	},
	image: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
	},
	darkOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	typeBadge: {
		position: "absolute",
		top: scaleSize(8),
		left: scaleSize(8),
		paddingHorizontal: scaleSize(6),
		paddingVertical: scaleSize(2),
		borderRadius: scaleSize(99),
	},
	shortListBadge: {
		position: "absolute",
		top: scaleSize(8),
		right: scaleSize(8),
		paddingHorizontal: scaleSize(4),
		paddingVertical: scaleSize(4),
		borderRadius: scaleSize(99),
	},
	imageBadgeText: {
		color: lightColors.background,
		fontSize: moderateScale(10),
		fontWeight: "bold",
		marginBottom: 0,
	},
	lockOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	lockCircle: {
		width: scaleSize(48),
		height: scaleSize(48),
		borderRadius: scaleSize(24),
		justifyContent: "center",
		alignItems: "center",
	},
	infoContainer: {
		flex: 1,
		padding: spacing.sm,
		paddingVertical: spacing.lg,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scaleSize(4),
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scaleSize(8),
	},
	address: {
		marginLeft: scaleSize(4),
		flexShrink: 1,
		marginBottom: 0,
	},
	specsRow: {
		flexDirection: "row",
		gap: scaleSize(8),
		marginBottom: scaleSize(8),
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(4),
	},
	unlockPill: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: scaleSize(6),
		paddingVertical: scaleSize(4),
		borderRadius: scaleSize(20),
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
		gap: scaleSize(2),
		flexShrink: 1,
		flexWrap: "wrap",
	},
	price: {
		flexShrink: 0,
		marginLeft: spacing.sm,
		marginBottom: 0,
		fontWeight: "600",
	},
	selectionBadge: {
		position: "absolute",
		top: scaleSize(8),
		right: scaleSize(8),
		width: scaleSize(28),
		height: scaleSize(28),
		justifyContent: "center",
		alignItems: "center",
	},
});
