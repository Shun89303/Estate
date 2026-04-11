import {
	BodyText,
	NormalTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { ContentItem } from "@/mock/contents";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";

export default function HomeContentCard({
	item,
	onPress,
}: {
	item: ContentItem;
	onPress?: () => void;
}) {
	const isArticle = item.type === "article";
	const colors = useTheme();

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: colors.background }]}
			activeOpacity={0.7}
			onPress={onPress}
		>
			{/* Left: Media - centered rectangle */}
			<View style={styles.cardLeft}>
				{isArticle ? (
					<View style={styles.imageWrapper}>
						<Image source={{ uri: item.imageUrl }} style={styles.image} />
						<View
							style={[
								styles.fileIconOverlay,
								{ backgroundColor: colors.primaryGold },
							]}
						>
							<Ionicons name="document-text-outline" size={20} color="#fff" />
						</View>
					</View>
				) : (
					<View style={styles.imageWrapper}>
						<Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
						<View style={styles.videoOverlay}>
							<Ionicons name="play-circle" size={40} color="#fff" />
						</View>
						{/* Optional: show duration if needed (commented out for now) */}
						{/* <View style={styles.durationBadge}>
							<BodyText style={styles.durationText}>{item.duration}</BodyText>
						</View> */}
					</View>
				)}
			</View>

			{/* Right: Content Info */}
			<View style={styles.cardRight}>
				{/* Category */}
				<SmallTitle style={[styles.typeText, { color: colors.primaryGold }]}>
					{item.category.toUpperCase()}
				</SmallTitle>

				{/* Title */}
				<NormalTitle style={styles.cardTitle} numberOfLines={2}>
					{item.title}
				</NormalTitle>

				{/* Meta row: postedBy • date */}
				<View style={styles.metaRow}>
					<BodyText>{item.postedBy}</BodyText>
					<BodyText>•</BodyText>
					<BodyText>{item.date}</BodyText>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		marginBottom: 16,
		borderRadius: 12,
		...globalStyles.shadows,
	},
	cardLeft: {
		width: 110,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 12,
	},
	imageWrapper: {
		width: 90,
		height: 90,
		borderRadius: 12,
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
		top: 6,
		left: 6,
		padding: 4,
		borderRadius: 99,
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
		bottom: 6,
		right: 6,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},
	durationText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "500",
	},
	cardRight: {
		flex: 1,
		padding: 10,
		paddingRight: 16,
		justifyContent: "space-between",
	},
	typeText: {
		letterSpacing: 0.5,
		marginBottom: 4,
	},
	cardTitle: {
		lineHeight: 20,
		marginBottom: 8,
	},
	metaRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
});
