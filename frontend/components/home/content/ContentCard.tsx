import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Content } from "@/mock/contents";

export default function ContentCard({
	content,
	showReadTime = false,
	onPress,
}: {
	content: Content;
	showReadTime?: boolean;
	onPress: () => void;
}) {
	return (
		<Pressable onPress={onPress}>
			<View style={styles.card}>
				{/* MEDIA (LEFT) */}
				<View style={styles.mediaWrapper}>
					<Image
						source={{
							uri: content.type === "video" ? content.thumbnail : content.media,
						}}
						style={styles.media}
					/>

					{/* ARTICLE ICON */}
					{content.type === "article" && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>📄</Text>
						</View>
					)}

					{/* VIDEO OVERLAY */}
					{content.type === "video" && (
						<View style={styles.playOverlay}>
							<Text style={styles.playIcon}>▶</Text>
						</View>
					)}
				</View>

				{/* INFO (RIGHT) */}
				<View style={styles.info}>
					{/* CATEGORY */}
					<Text style={styles.category}>{content.category}</Text>

					{/* TITLE */}
					<Text style={styles.title} numberOfLines={2}>
						{content.title}
					</Text>

					{/* META ROW */}
					<View style={styles.metaRow}>
						<Text style={styles.meta}>{content.posted_by}</Text>
						<Text style={styles.meta}>•</Text>
						<Text style={styles.meta}>{content.date}</Text>
					</View>

					{/* OPTIONAL READ TIME */}
					{showReadTime && content.read_time && (
						<Text style={styles.readTime}>{content.read_time}</Text>
					)}
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
	},

	/* MEDIA */
	mediaWrapper: {
		width: 120,
		height: 100,
		position: "relative",
	},

	media: {
		width: "100%",
		height: "100%",
	},

	badge: {
		position: "absolute",
		top: 6,
		left: 6,
		backgroundColor: "rgba(0,0,0,0.6)",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},

	badgeText: {
		color: "#fff",
		fontSize: 10,
	},

	playOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},

	playIcon: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},

	/* INFO */
	info: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
	},

	category: {
		fontSize: 10,
		color: "#888",
		fontWeight: "600",
		marginBottom: 4,
	},

	title: {
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 6,
	},

	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},

	meta: {
		fontSize: 11,
		color: "#666",
	},

	readTime: {
		fontSize: 11,
		color: "#999",
		marginTop: 2,
	},
});
