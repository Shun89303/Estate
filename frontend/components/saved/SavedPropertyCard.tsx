import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Trash2, Share2 } from "lucide-react-native";
import Title from "@/components/common/typography/Title";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";
import { getDetailRoute } from "@/utils/propertyHelpers";
import { PropertyCategory } from "@/stores/savedPropertiesStore";
import Badge from "@/components/common/utils/Badge";
import LocationRow from "@/components/common/utils/LocationRow";
import SubTitle from "../common/typography/SubTitle";

interface SavedPropertyCardProps {
	property: {
		uniqueCode: string;
		category: PropertyCategory;
		coverImage: string;
		title: string;
		location: string;
		priceDisplay: string;
	};
	onDelete: () => void;
	onShare: () => void;
}

const getCategoryDisplay = (category: string): string => {
	switch (category) {
		case "buySell":
			return "Buy/Sell";
		case "roomRent":
			return "Room Rent";
		case "ownerDirect":
			return "Owner Direct";
		case "offPlan":
			return "Off Plan";
		case "business":
			return "Business";
		case "buyBusiness":
			return "Buy Business";
		default:
			return category;
	}
};

export default function SavedPropertyCard({
	property,
	onDelete,
	onShare,
}: SavedPropertyCardProps) {
	const router = useRouter();

	const handlePress = () => {
		const route = getDetailRoute(property.category, property.uniqueCode);
		router.push(route as any);
	};

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={handlePress}
			activeOpacity={0.7}
		>
			<Image source={{ uri: property.coverImage }} style={styles.image} />
			<View style={styles.info}>
				<Badge
					label={getCategoryDisplay(property.category)}
					backgroundColor={lightColors.brandBG}
					color={lightColors.brand}
					textVariant="small"
				/>
				<Title variant="small" numberOfLines={1} style={styles.title}>
					{property.title}
				</Title>
				<LocationRow
					location={property.location}
					textVariant="small"
					containerStyle={{ marginBottom: 0 }}
				/>
				<SubTitle variant="normal" style={styles.price}>
					{property.priceDisplay}
				</SubTitle>
			</View>
			<View style={styles.actions}>
				<TouchableOpacity onPress={onShare} style={styles.actionButton}>
					<Share2 size={moderateScale(18)} color={lightColors.bodyText} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onDelete} style={styles.actionButton}>
					<Trash2 size={moderateScale(18)} color={lightColors.danger} />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		marginBottom: spacing.md,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	image: {
		width: scaleSize(100),
		height: "100%",
		resizeMode: "cover",
	},
	info: {
		flex: 1,
		padding: spacing.sm,
		justifyContent: "center",
	},
	title: {
		marginTop: spacing.xs,
		marginBottom: scaleSize(2),
	},
	price: {
		marginTop: scaleSize(4),
	},
	actions: {
		justifyContent: "space-between",
		padding: spacing.md,
	},
	actionButton: {
		padding: spacing.xs,
	},
});
