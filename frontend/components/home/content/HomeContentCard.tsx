// components/content/HomeContentCard.tsx
import { ContentItem } from "@/mock/contents";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "@/styles/styles";
import { lightColors } from "@/theme/light";
import { FileText, Play } from "lucide-react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import SubTitle from "@/components/common/typography/SubTitle";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

export default function HomeContentCard({
	item,
	onPress,
}: {
	item: ContentItem;
	onPress?: () => void;
}) {
	const isArticle = item.type === "article";

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: lightColors.background }]}
			activeOpacity={0.7}
			onPress={onPress}
		>
			<View style={styles.cardLeft}>
				{isArticle ? (
					<View style={styles.imageWrapper}>
						<Image source={{ uri: item.imageUrl }} style={styles.image} />
						<View
							style={[
								styles.fileIconOverlay,
								{ backgroundColor: lightColors.brand },
							]}
						>
							<FileText
								size={moderateScale(20)}
								color={lightColors.background}
							/>
						</View>
					</View>
				) : (
					<View style={styles.imageWrapper}>
						<Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
						<View style={styles.videoOverlay}>
							<Play
								size={moderateScale(30)}
								color="transparent"
								fill={lightColors.background}
							/>
						</View>
					</View>
				)}
			</View>

			<View style={styles.cardRight}>
				<SubTitle variant="small">{item.category.toUpperCase()}</SubTitle>
				<Title variant="small" style={{ marginBottom: 0 }} numberOfLines={2}>
					{item.title}
				</Title>
				<View style={styles.metaRow}>
					<BodyText variant="small" style={{}}>
						{item.postedBy}
					</BodyText>
					<BodyText variant="small" style={{}}>
						•
					</BodyText>
					<BodyText variant="small" style={{}}>
						{item.date}
					</BodyText>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		marginBottom: spacing.lg,
		borderRadius: scaleSize(12),
		...globalStyles.shadows,
	},
	cardLeft: {
		width: scaleSize(110),
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: spacing.md,
	},
	imageWrapper: {
		width: scaleSize(90),
		height: scaleSize(90),
		borderRadius: scaleSize(12),
		overflow: "hidden",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	fileIconOverlay: {
		position: "absolute",
		top: scaleSize(6),
		left: scaleSize(6),
		padding: scaleSize(4),
		borderRadius: scaleSize(10),
	},
	videoOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	durationBadge: {
		position: "absolute",
		bottom: scaleSize(6),
		right: scaleSize(6),
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: scaleSize(6),
		paddingVertical: scaleSize(2),
		borderRadius: scaleSize(4),
	},
	durationText: {
		color: lightColors.background,
		fontSize: moderateScale(10),
		fontWeight: "500",
	},
	cardRight: {
		flex: 1,
		padding: spacing.sm,
		paddingRight: spacing.lg,
		justifyContent: "space-between",
	},
	metaRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		gap: scaleSize(5),
	},
});
