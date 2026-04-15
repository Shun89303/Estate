import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import { useShortlistStore } from "@/stores/shortlistStore";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { Star, StarOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import formatPriceShort from "@/utils/formatPriceShort";

interface Props {
	onClose: () => void;
}

export default function ShortlistBottomSheetContent({ onClose }: Props) {
	const { shortlistedItems, removeFromShortlist } = useShortlistStore();
	const router = useRouter();

	const handleRemove = (id: string | number) => {
		removeFromShortlist(id);
	};

	const handleItemPress = (item: any) => {
		onClose();
		router.push(`/`);
	};

	const renderEmptyState = () => (
		<View style={styles.emptyContainer}>
			<StarOff
				size={moderateScale(48)}
				color={lightColors.bodyText}
				strokeWidth={1.5}
			/>
			<BodyText variant="large" style={styles.emptyText}>
				No shortlisted businesses yet
			</BodyText>
			<BodyText variant="normal" style={styles.emptySubtext}>
				Tap the ★ on unlocked businesses to add them
			</BodyText>
		</View>
	);

	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity
			style={styles.itemContainer}
			onPress={() => handleItemPress(item)}
			activeOpacity={0.7}
		>
			<Image source={{ uri: item.coverImage }} style={styles.thumbnail} />
			<View style={styles.itemInfo}>
				<Title variant="small" numberOfLines={1} style={styles.itemTitle}>
					{item.title}
				</Title>
				<BodyText variant="small" style={styles.itemLocation}>
					{item.location}
				</BodyText>
				<View style={styles.statsRow}>
					<BodyText variant="small" style={styles.monthlyProfit}>
						฿{formatPriceShort(item.monthlyProfit)}/mo profit
					</BodyText>
					<Title variant="small" style={styles.itemPrice}>
						฿{item.price.toLocaleString()}
					</Title>
				</View>
			</View>
			<TouchableOpacity
				style={styles.starContainer}
				onPress={() => handleRemove(item.id)}
				activeOpacity={0.7}
			>
				<Star
					size={moderateScale(20)}
					color={lightColors.brand}
					fill={lightColors.brand}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<View style={styles.contentContainer}>
			<View style={styles.header}>
				<View style={styles.titleContainer}>
					<Star
						size={moderateScale(24)}
						color={lightColors.brand}
						fill={lightColors.brand}
					/>
					<Title variant="page" style={styles.headerTitle}>
						My Shortlist
					</Title>
				</View>
			</View>
			<BodyText variant="normal" style={styles.headerSubtitle}>
				Your shortlisted businesses for quick access
			</BodyText>

			<FlatList
				data={shortlistedItems}
				keyExtractor={(item) => String(item.id)}
				renderItem={renderItem}
				ListEmptyComponent={renderEmptyState}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: spacing.xs,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	headerTitle: {
		marginBottom: 0,
	},
	headerSubtitle: {
		marginBottom: spacing.md,
	},
	listContent: {
		paddingBottom: spacing.xl,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.xxxl,
		gap: spacing.md,
	},
	emptyText: {
		textAlign: "center",
		marginBottom: 0,
	},
	emptySubtext: {
		textAlign: "center",
	},
	itemContainer: {
		flexDirection: "row",
		backgroundColor: lightColors.entireAppBackground,
		borderRadius: scaleSize(12),
		marginBottom: spacing.md,
		padding: spacing.sm,
		alignItems: "center",
	},
	thumbnail: {
		width: scaleSize(70),
		height: scaleSize(70),
		borderRadius: scaleSize(10),
		marginRight: spacing.md,
	},
	itemInfo: {
		flex: 1,
	},
	itemTitle: {
		marginBottom: scaleSize(4),
	},
	itemLocation: {
		marginBottom: scaleSize(4),
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: scaleSize(4),
	},
	monthlyProfit: {
		color: lightColors.success,
	},
	itemPrice: {
		color: lightColors.brand,
		marginBottom: 0,
	},
	starContainer: {
		alignSelf: "flex-start",
		paddingTop: spacing.sm,
	},
});
