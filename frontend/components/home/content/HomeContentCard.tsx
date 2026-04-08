import {
	BodyText,
	NormalTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { ContentItem } from "@/mock/contents";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ContentCard({
	item,
	onPress,
}: {
	item: ContentItem;
	onPress?: () => void;
}) {
	const isArticle = item.type === "article";

	return (
		<TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
			{/* Left: Media */}
			<View style={styles.cardLeft}>
				{isArticle ? (
					<View style={styles.imageContainer}>
						<Image source={{ uri: item.imageUrl }} style={styles.image} />
						<View style={styles.fileIconOverlay}>
							<Ionicons name="document-text-outline" size={20} color="#fff" />
						</View>
					</View>
				) : (
					<View style={styles.imageContainer}>
						<Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
						<View style={styles.videoOverlay}>
							<Ionicons name="play-circle" size={40} color="#fff" />
						</View>
					</View>
				)}
			</View>

			{/* Right: Content Info */}
			<View style={styles.cardRight}>
				<View style={styles.titleRow}>
					<View>
						<SmallTitle style={styles.typeText}>
							{/* {isArticle ? "ARTICLE" : "VIDEO"} */}
							{item.category.toUpperCase()}
						</SmallTitle>
						<NormalTitle style={styles.cardTitle} numberOfLines={2}>
							{item.title}
						</NormalTitle>
					</View>
				</View>

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
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	backButton: {
		padding: 4,
	},
	titleContainer: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
	},
	subtitle: {
		fontSize: 12,
		color: "#888",
		marginTop: 2,
	},
	filterScroll: {
		flexGrow: 0,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	filterContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 8,
	},
	filterChip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#f2f2f2",
		marginRight: 8,
	},
	filterChipActive: {
		backgroundColor: "#2c6e9e",
	},
	filterChipText: {
		fontSize: 14,
		color: "#333",
	},
	filterChipTextActive: {
		color: "#fff",
		fontWeight: "500",
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 20,
	},
	card: {
		flexDirection: "row",
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	cardLeft: {
		width: 110,
		height: 110,
	},
	imageContainer: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	fileIconOverlay: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: 4,
		borderRadius: 6,
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
		justifyContent: "space-between",
	},
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	typeText: {
		// fontSize: 11,
		// fontWeight: "600",
		color: "#2c6e9e",
		letterSpacing: 0.5,
		marginBottom: 4,
	},
	cardTitle: {
		// fontSize: 15,
		// fontWeight: "600",
		lineHeight: 20,
		flex: 1,
		marginRight: 8,
	},
	metaRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	metaText: {
		fontSize: 11,
		color: "#888",
	},
	metaDot: {
		fontSize: 11,
		color: "#888",
		marginHorizontal: 4,
	},
	emptyText: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 14,
		color: "#888",
	},
});
