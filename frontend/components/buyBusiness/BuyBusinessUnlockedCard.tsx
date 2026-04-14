// components/buyBusiness/BuyBusinessUnlockedCard.tsx
import { View, Image, StyleSheet, Pressable } from "react-native";
import {
	MapPin,
	Users,
	Calendar,
	LockOpen,
	ChevronRight,
} from "lucide-react-native";
import { BuyBusiness } from "@/mock/buyBusiness";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import globalStyles from "@/styles/styles";
import ShortlistButton from "../shortlist/ShortlistButton";
import formatPriceShort from "@/utils/formatPriceShort";
import SubTitle from "../common/typography/SubTitle";

interface Props {
	property: BuyBusiness;
	onPress: () => void;
}

export default function BuyBusinessUnlockedCard({ property, onPress }: Props) {
	return (
		<Pressable onPress={onPress} style={styles.card}>
			<View>
				<Image source={{ uri: property.coverImage }} style={styles.image} />
				<View
					style={{
						position: "absolute",
						top: 10,
						left: 10,
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
						backgroundColor: lightColors.success,
						paddingHorizontal: 5,
						borderRadius: 99,
					}}
				>
					<LockOpen color={lightColors.background} size={12} />
					<BodyText style={{ marginBottom: 0, color: lightColors.background }}>
						Unlocked
					</BodyText>
				</View>
				<View
					style={{
						position: "absolute",
						top: 10,
						right: 10,
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
						backgroundColor: lightColors.background,
						padding: 5,
						borderRadius: 99,
					}}
				>
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
			</View>
			<View style={styles.infoContainer}>
				<Title variant="small" numberOfLines={1}>
					{property.title}
				</Title>
				<BodyText variant="small" style={styles.address} numberOfLines={1}>
					{property.location}
				</BodyText>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<SubTitle
						variant="small"
						style={{
							marginBottom: 0,
							color: lightColors.success,
						}}
					>
						฿{formatPriceShort(property.monthlyProfit)}/mo
					</SubTitle>
					<SubTitle
						variant="normal"
						style={{
							marginBottom: 0,
						}}
					>
						฿{property.price.toLocaleString()}
					</SubTitle>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
						marginVertical: 5,
					}}
				>
					<SubTitle
						variant="small"
						style={{
							marginBottom: 0,
						}}
					>
						View Details
					</SubTitle>
					<ChevronRight color={lightColors.brand} size={15} />
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		width: scaleSize(200),
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		marginRight: spacing.md,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	image: {
		width: "100%",
		height: scaleSize(120),
		resizeMode: "cover",
		position: "relative",
	},
	infoContainer: {
		padding: spacing.sm,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scaleSize(6),
	},
	address: {
		flexShrink: 1,
	},
	specsRow: {
		flexDirection: "row",
		gap: scaleSize(8),
		marginBottom: scaleSize(6),
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(4),
	},
	specText: {
		fontSize: moderateScale(10),
	},
});
