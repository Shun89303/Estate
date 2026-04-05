import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";
import { Content } from "@/mock/contents";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function ContentCard({ content }: { content: Content }) {
	const router = useRouter();

	return (
		<Pressable onPress={() => router.push("/contents")}>
			<View style={styles.card}>
				{/* MEDIA */}
				<View style={styles.mediaWrapper}>
					<Image
						source={{
							uri: content.type === "video" ? content.thumbnail : content.media,
						}}
						style={styles.media}
					/>

					{/* ARTICLE / VIDEO BADGE */}
					{content.type === "article" && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>📄</Text>
						</View>
					)}

					{/* PLAY INDICATOR FOR VIDEO */}
					{content.type === "video" && (
						<View style={styles.playOverlay}>
							<Text style={styles.playIcon}>▶</Text>
						</View>
					)}
				</View>

				{/* INFO */}
				<View style={styles.info}>
					<Text style={styles.type}>
						{content.type === "article" ? "Article" : "Video"}
					</Text>

					<Text style={styles.title} numberOfLines={2}>
						{content.title}
					</Text>

					<Text style={styles.meta}>
						{content.posted_by} • {formatDate(content.date)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}

/* ---------------- UTIL ---------------- */

function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},

	mediaWrapper: {
		position: "relative",
	},

	media: {
		width: "100%",
		height: width * 0.5,
	},

	badge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "rgba(0,0,0,0.6)",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},

	badgeText: {
		color: "#fff",
		fontSize: 12,
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
		fontSize: 36,
		fontWeight: "bold",
	},

	info: {
		padding: 12,
	},

	type: {
		fontSize: 11,
		color: "#888",
		marginBottom: 4,
	},

	title: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 6,
	},

	meta: {
		fontSize: 12,
		color: "#666",
	},
});
