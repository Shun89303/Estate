import { useState } from "react";
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

export default function ContentCard({
	item,
	onPress,
}: {
	item: ContentItem;
	onPress?: () => void;
}) {
	const isArticle = item.type === "article";
	const colors = useTheme();
	const [isSaved, setIsSaved] = useState(item.saved);

	const toggleSave = () => setIsSaved((prev) => !prev);

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
								{
									backgroundColor: colors.primaryGold,
								},
							]}
						>
							<Ionicons name="document-text-outline" size={20} color={"#fff"} />
						</View>
					</View>
				) : (
					<View style={styles.imageWrapper}>
						<Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
						<View style={styles.videoOverlay}>
							<Ionicons name="play-circle" size={40} color="#fff" />
						</View>
						<View style={styles.durationBadge}>
							<BodyText style={styles.durationText}>{item.duration}</BodyText>
						</View>
					</View>
				)}
			</View>

			{/* Right: Content Info */}
			<View style={styles.cardRight}>
				{/* Row: category + bookmark */}
				<View style={styles.categoryRow}>
					<SmallTitle style={[styles.typeText, { color: colors.primaryGold }]}>
						{item.category.toUpperCase()}
					</SmallTitle>
					<TouchableOpacity
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
						onPress={toggleSave}
					>
						<Ionicons
							name={isSaved ? "bookmark" : "bookmark-outline"}
							size={22}
							color={isSaved ? colors.primaryGold : colors.primaryGray}
						/>
					</TouchableOpacity>
				</View>

				{/* Title */}
				<NormalTitle style={styles.cardTitle} numberOfLines={2}>
					{item.title}
				</NormalTitle>

				{/* Meta row */}
				<View style={styles.metaRow}>
					<BodyText>{item.postedBy}</BodyText>
					<BodyText>•</BodyText>
					<BodyText>{item.date}</BodyText>
					{isArticle && (
						<>
							<BodyText>•</BodyText>
							<BodyText>{item.readTimeMinutes} min read</BodyText>
						</>
					)}
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
		justifyContent: "center", // centers the image vertically
		alignItems: "center",
		paddingVertical: 12, // optional: adds some breathing space
	},
	imageWrapper: {
		width: 90, // fixed width for the rectangle
		height: 90, // fixed height (square, but you can change aspect ratio)
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
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
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
	categoryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
});
