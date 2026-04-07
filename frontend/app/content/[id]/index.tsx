import { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { ArticleContent, MOCK_CONTENTS, VideoContent } from "@/mock/contents";

const { width: screenWidth } = Dimensions.get("window");

export default function ContentDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const content = MOCK_CONTENTS.find((c) => c.id.toString() === id);

	const [saved, setSaved] = useState(content?.saved || false);
	const [liked, setLiked] = useState(false);

	if (!content) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.notFound}>
					<Text>Content not found</Text>
					<TouchableOpacity onPress={() => router.back()}>
						<Text style={styles.backLink}>Go Back</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	const toggleSave = () => setSaved(!saved);
	const toggleLike = () => setLiked(!liked);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Hero Media Section */}
				<View style={styles.heroContainer}>
					{content.type === "article" ? (
						<Image
							source={{ uri: (content as ArticleContent).imageUrl }}
							style={styles.heroImage}
						/>
					) : (
						<Video
							source={{ uri: (content as VideoContent).videoUrl }}
							style={styles.heroImage}
							useNativeControls
							isLooping
						/>
					)}

					<TouchableOpacity
						onPress={() => router.back()}
						style={styles.backButton}
					>
						<Ionicons name="arrow-back" size={24} color="#fff" />
					</TouchableOpacity>

					<View style={styles.rightButtons}>
						<TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
							<Ionicons
								name={liked ? "heart" : "heart-outline"}
								size={24}
								color="#fff"
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleSave} style={styles.iconButton}>
							<Ionicons
								name={saved ? "bookmark" : "bookmark-outline"}
								size={24}
								color="#fff"
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.categoryBadge}>
						<Text style={styles.categoryText}>{content.category}</Text>
					</View>
				</View>

				{/* Content Body */}
				<View style={styles.body}>
					<Text style={styles.title}>{content.title}</Text>

					{/* Author Row */}
					<View style={styles.authorRow}>
						<Image
							source={{ uri: content.authorProfileImage }}
							style={styles.authorImage}
						/>
						<View style={styles.authorDetails}>
							<Text style={styles.authorName}>{content.postedBy}</Text>
							<View style={styles.metaRow}>
								<Text style={styles.metaText}>{content.date}</Text>
								<Text style={styles.metaDot}>•</Text>
								<Text style={styles.metaText}>{content.likes} likes</Text>
								{content.type === "article" && (
									<>
										<Text style={styles.metaDot}>•</Text>
										<Text style={styles.metaText}>
											{(content as ArticleContent).readTimeMinutes} min read
										</Text>
									</>
								)}
							</View>
						</View>
					</View>

					{/* Article-specific: content + key takeaways + CTA */}
					{content.type === "article" && (
						<>
							<Text style={styles.contentText}>
								{(content as ArticleContent).content}
							</Text>
							{(content as ArticleContent).keyTakeaways && (
								<View style={styles.takeawaysBox}>
									<Text style={styles.takeawaysTitle}>Key Takeaways</Text>
									{(content as ArticleContent).keyTakeaways!.map((tip, idx) => (
										<View key={idx} style={styles.tipRow}>
											<Text style={styles.bullet}>•</Text>
											<Text style={styles.tipText}>{tip}</Text>
										</View>
									))}
								</View>
							)}
							<View style={styles.ctaBox}>
								<Text style={styles.ctaTitle}>
									{(content as ArticleContent).cta.title}
								</Text>
								<Text style={styles.ctaDescription}>
									{(content as ArticleContent).cta.description}
								</Text>
								<TouchableOpacity
									style={styles.ctaButton}
									onPress={() => router.push("/")}
								>
									<Text style={styles.ctaButtonText}>
										{(content as ArticleContent).cta.buttonText}
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}

					{/* Video-specific: content + CTA (no key takeaways) */}
					{content.type === "video" && (
						<>
							<Text style={styles.contentText}>
								{(content as VideoContent).content}
							</Text>
							<View style={styles.ctaBox}>
								<Text style={styles.ctaTitle}>
									{(content as VideoContent).cta.title}
								</Text>
								<Text style={styles.ctaDescription}>
									{(content as VideoContent).cta.description}
								</Text>
								<TouchableOpacity
									style={styles.ctaButton}
									onPress={() => router.push("/")}
								>
									<Text style={styles.ctaButtonText}>
										{(content as VideoContent).cta.buttonText}
									</Text>
								</TouchableOpacity>
							</View>

							{/* Related Videos */}
							<View style={styles.relatedSection}>
								<Text style={styles.relatedTitle}>Related Videos</Text>
								{(content as VideoContent).relatedVideos.map((video) => (
									<TouchableOpacity
										key={video.id}
										style={styles.relatedCard}
										onPress={() => router.push(`/content/${video.id}`)}
									>
										<Image
											source={{ uri: video.thumbnailUrl }}
											style={styles.relatedThumb}
										/>
										<View style={styles.relatedInfo}>
											<Text style={styles.relatedCardTitle} numberOfLines={2}>
												{video.title}
											</Text>
											<Text style={styles.relatedMeta}>Video</Text>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

// Styles remain exactly as in the previous version (unchanged)
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	notFound: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	backLink: { marginTop: 12, color: "#2c6e9e", fontSize: 16 },
	heroContainer: { width: screenWidth, height: 250, position: "relative" },
	heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
	backButton: {
		position: "absolute",
		top: 12,
		left: 16,
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 8,
		borderRadius: 20,
	},
	rightButtons: {
		position: "absolute",
		top: 12,
		right: 16,
		flexDirection: "row",
		gap: 12,
	},
	iconButton: {
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 8,
		borderRadius: 20,
	},
	categoryBadge: {
		position: "absolute",
		bottom: 12,
		left: 16,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 20,
	},
	categoryText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "600",
		textTransform: "capitalize",
	},
	body: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 },
	title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, lineHeight: 32 },
	authorRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
	authorImage: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
	authorDetails: { flex: 1 },
	authorName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
	metaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
	metaText: { fontSize: 12, color: "#666" },
	metaDot: { marginHorizontal: 6, color: "#666" },
	contentText: {
		fontSize: 16,
		lineHeight: 24,
		color: "#333",
		marginBottom: 24,
	},
	takeawaysBox: {
		backgroundColor: "#f8f8f8",
		padding: 16,
		borderRadius: 12,
		marginBottom: 24,
	},
	takeawaysTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
	tipRow: { flexDirection: "row", marginBottom: 8 },
	bullet: { fontSize: 16, marginRight: 8, color: "#2c6e9e" },
	tipText: { flex: 1, fontSize: 14, lineHeight: 20, color: "#444" },
	ctaBox: {
		backgroundColor: "#eaf4f8",
		padding: 20,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 24,
	},
	ctaTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
		color: "#1a4d6b",
	},
	ctaDescription: {
		fontSize: 14,
		textAlign: "center",
		marginBottom: 16,
		color: "#333",
	},
	ctaButton: {
		backgroundColor: "#2c6e9e",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 30,
	},
	ctaButtonText: { color: "#fff", fontWeight: "600" },
	relatedSection: { marginTop: 8 },
	relatedTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
	relatedCard: {
		flexDirection: "row",
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		overflow: "hidden",
	},
	relatedThumb: { width: 100, height: 70, resizeMode: "cover" },
	relatedInfo: { flex: 1, padding: 8, justifyContent: "center" },
	relatedCardTitle: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
	relatedMeta: { fontSize: 11, color: "#888" },
});
