import { useState, useEffect } from "react";
import {
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { ArticleContent, MOCK_CONTENTS, VideoContent } from "@/mock/contents";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import { ChevronRight, Clock, Dot, Heart } from "lucide-react-native";
import BackButton from "@/components/common/BackButton";
import HeartButton from "@/components/common/HeartButton";
import BookmarkButton from "@/components/common/BookmarkButton";

const { width: screenWidth } = Dimensions.get("window");

export default function ContentDetails() {
	const router = useRouter();
	const colors = useTheme();
	const { id } = useLocalSearchParams<{ id: string }>();
	const content = MOCK_CONTENTS.find((c) => c.id.toString() === id);

	const [saved, setSaved] = useState(content?.saved || false);
	const [liked, setLiked] = useState(false);

	const [videoStarted, setVideoStarted] = useState(false);

	const videoUrl =
		content?.type === "video" ? (content as VideoContent).videoUrl : "";

	const player = useVideoPlayer(videoUrl, (player) => {
		player.loop = false;
	});

	useEffect(() => {
		if (content?.type === "video" && videoStarted && videoUrl) {
			player
				.replaceAsync(videoUrl)
				.then(() => player.play())
				.catch(console.error);
		}
	}, [videoStarted, content?.type, videoUrl, player]);

	if (!content) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.notFound}>
					<BodyText>Content not found</BodyText>
					<TouchableOpacity onPress={() => router.back()}>
						<BodyText style={[styles.backLink, { color: colors.primaryGold }]}>
							Go Back
						</BodyText>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	const toggleSave = () => setSaved(!saved);
	const toggleLike = () => setLiked(!liked);

	return (
		<SafeAreaView style={[styles.container]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Hero Media Section */}
				<View style={styles.heroContainer}>
					{content.type === "article" ? (
						<Image
							source={{ uri: (content as ArticleContent).imageUrl }}
							style={styles.heroImage}
						/>
					) : !videoStarted ? (
						<Pressable
							onPress={() => setVideoStarted(true)}
							style={styles.videoThumbContainer}
						>
							<Image
								source={{ uri: (content as VideoContent).thumbnailUrl }}
								style={styles.heroImage}
							/>
							<View style={styles.playOverlay}>
								<Ionicons name="play-circle" size={60} color="#fff" />
							</View>
							{/* Duration badge */}
							<View style={styles.heroDurationBadge}>
								<BodyText style={styles.heroDurationText}>
									{(content as VideoContent).duration}
								</BodyText>
							</View>
						</Pressable>
					) : (
						<VideoView
							player={player}
							style={styles.heroImage}
							nativeControls
							contentFit="cover"
						/>
					)}

					<BackButton
						style={[styles.backButton, { backgroundColor: "rgba(0,0,0,0.5)" }]}
						iconColor="#fff"
					/>

					<View style={styles.rightButtons}>
						<HeartButton
							onPress={toggleLike}
							filled={liked}
							color="#fff"
							style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
							borderRadius={15}
						/>
						<BookmarkButton
							onPress={toggleSave}
							filled={saved}
							color="#fff"
							style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
							borderRadius={15}
						/>
					</View>

					{content.type === "article" && (
						<View
							style={[
								styles.categoryBadge,
								{ backgroundColor: colors.primaryGold },
							]}
						>
							<SmallTitle style={styles.categoryText}>
								{content.category}
							</SmallTitle>
						</View>
					)}
				</View>

				{/* Content Body */}
				<View style={styles.body}>
					{content.type === "video" && (
						<View style={styles.bodyCategoryBadge}>
							<SmallTitle
								style={{ color: colors.primaryGold, fontWeight: "600" }}
							>
								{content.category.toLocaleUpperCase()}
							</SmallTitle>
						</View>
					)}
					<PageTitle style={{ marginBottom: 16, lineHeight: 32 }}>
						{content.title}
					</PageTitle>

					{/* Author Row */}
					<View style={styles.authorRow}>
						<Image
							source={{ uri: content.authorProfileImage }}
							style={styles.authorImage}
						/>
						<View style={styles.authorDetails}>
							<NormalTitle style={styles.authorName}>
								{content.postedBy}
							</NormalTitle>
							<View style={styles.metaRow}>
								<View style={styles.metaItem}>
									<Clock size={12} color={colors.textSecondary} />
									<BodyText style={styles.metaText}>{content.date}</BodyText>
								</View>
								<View style={styles.metaItem}>
									<Heart size={12} color={colors.textSecondary} />
									<BodyText style={styles.metaText}>
										{content.likes} likes
									</BodyText>
								</View>
								{content.type === "article" && (
									<View style={styles.metaItem}>
										<Dot size={12} color={colors.primaryGold} />
										<BodyText style={styles.metaText}>
											{(content as ArticleContent).readTimeMinutes} min read
										</BodyText>
									</View>
								)}
							</View>
						</View>
					</View>

					{/* Article-specific */}
					{content.type === "article" && (
						<>
							<BodyText
								style={[
									styles.contentText,
									{
										color: colors.textPrimary,
									},
								]}
							>
								{(content as ArticleContent).content}
							</BodyText>
							{(content as ArticleContent).keyTakeaways && (
								<View style={styles.takeawaysBox}>
									<NormalTitle style={styles.takeawaysTitle}>
										Key Takeaways
									</NormalTitle>
									{(content as ArticleContent).keyTakeaways!.items.map(
										(tip, idx) => (
											<View key={idx} style={styles.tipRow}>
												<Dot size={30} color={colors.primaryGold} />
												<BodyText
													style={[
														styles.tipText,
														{
															color: colors.textPrimary,
														},
													]}
												>
													{tip}
												</BodyText>
											</View>
										),
									)}
									<BodyText style={{ color: colors.textPrimary }}>
										{(content as ArticleContent).keyTakeaways!.ending}
									</BodyText>
								</View>
							)}
							<View
								style={[
									styles.ctaBox,
									{
										borderColor: colors.primaryGold + 50,
										backgroundColor: colors.primaryGold + "10",
									},
								]}
							>
								<View
									style={[
										styles.ctaCircle,
										{ backgroundColor: colors.primaryGold },
									]}
								/>
								<SmallTitle
									style={{
										marginBottom: 8,
										color: colors.primaryGold,
										fontWeight: "600",
									}}
								>
									{(content as ArticleContent).cta.title}
								</SmallTitle>
								<NormalTitle
									style={[
										styles.ctaSubtitle,
										{
											fontWeight: "700",
										},
									]}
								>
									{(content as ArticleContent).cta.subtitle}
								</NormalTitle>
								<BodyText style={styles.ctaBody}>
									{(content as ArticleContent).cta.body}
								</BodyText>
								<TouchableOpacity
									style={[
										styles.ctaButton,
										{ backgroundColor: colors.primaryGold },
									]}
									onPress={() => router.push("/")}
								>
									<BodyText style={styles.ctaButtonText}>
										{(content as ArticleContent).cta.buttonText}
									</BodyText>
									<ChevronRight size={16} color="#fff" />
								</TouchableOpacity>
							</View>
						</>
					)}

					{/* Video-specific */}
					{content.type === "video" && (
						<>
							<BodyText
								style={[
									styles.contentText,
									{
										color: colors.textPrimary,
									},
								]}
							>
								{(content as VideoContent).content}
							</BodyText>
							<View
								style={[
									styles.ctaBox,
									{
										borderColor: colors.primaryGold + 50,
										backgroundColor: colors.primaryGold + "10",
									},
								]}
							>
								<View
									style={[
										styles.ctaCircle,
										{ backgroundColor: colors.primaryGold },
									]}
								/>
								<SmallTitle
									style={{
										marginBottom: 8,
										color: colors.primaryGold,
										fontWeight: "600",
									}}
								>
									{(content as VideoContent).cta.title}
								</SmallTitle>
								<NormalTitle
									style={[
										styles.ctaSubtitle,
										{
											fontWeight: "700",
										},
									]}
								>
									{(content as VideoContent).cta.subtitle}
								</NormalTitle>
								<BodyText style={styles.ctaBody}>
									{(content as VideoContent).cta.body}
								</BodyText>
								<TouchableOpacity
									style={[
										styles.ctaButton,
										{ backgroundColor: colors.primaryGold },
									]}
									onPress={() => router.push("/")}
								>
									<BodyText style={styles.ctaButtonText}>
										{(content as VideoContent).cta.buttonText}
									</BodyText>
									<ChevronRight size={16} color="#fff" />
								</TouchableOpacity>
							</View>

							{/* Related Videos */}
							<View style={styles.relatedSection}>
								<NormalTitle style={styles.relatedTitle}>
									Related Videos
								</NormalTitle>
								{(content as VideoContent).relatedVideos.map((video) => (
									<TouchableOpacity
										key={video.id}
										style={styles.relatedCard}
										onPress={() => router.push(`/content/${video.id}`)}
									>
										<View style={styles.relatedThumbContainer}>
											<Image
												source={{ uri: video.thumbnailUrl }}
												style={styles.relatedThumb}
											/>
											<View style={styles.relatedPlayOverlay}>
												<Ionicons name="play-circle" size={30} color="#fff" />
											</View>
											{video.duration && (
												<View style={styles.relatedDurationBadge}>
													<BodyText style={styles.relatedDurationText}>
														{video.duration}
													</BodyText>
												</View>
											)}
										</View>
										<View style={styles.relatedInfo}>
											<NormalTitle
												numberOfLines={2}
												style={styles.relatedCardTitle}
											>
												{video.title}
											</NormalTitle>
											<View style={styles.relatedMetaRow}>
												<BodyText style={styles.relatedMetaText}>
													{video.postedBy}
												</BodyText>
												<BodyText style={styles.relatedMetaDot}>•</BodyText>
												<BodyText style={styles.relatedMetaText}>
													{video.date}
												</BodyText>
											</View>
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

const styles = StyleSheet.create({
	container: { flex: 1 },
	notFound: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	backLink: { marginTop: 12, fontSize: 16 },
	heroContainer: { width: screenWidth, height: 250, position: "relative" },
	heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
	rightButtons: {
		position: "absolute",
		top: 12,
		right: 16,
		flexDirection: "row",
		gap: 12,
		zIndex: 10,
	},
	iconButton: {
		padding: 8,
		borderRadius: 15,
	},
	categoryBadge: {
		position: "absolute",
		bottom: 12,
		left: 16,
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 20,
		zIndex: 10,
	},
	categoryText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "600",
		textTransform: "capitalize",
	},
	body: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 },
	authorRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
	authorImage: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
	authorDetails: { flex: 1 },
	authorName: { marginBottom: 4 },
	metaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
	metaText: { fontSize: 12 },
	metaDot: { marginHorizontal: 6, fontSize: 12 },
	contentText: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 24,
	},
	takeawaysBox: {
		padding: 16,
		borderRadius: 12,
		marginBottom: 24,
	},
	takeawaysTitle: { fontSize: 18, marginBottom: 12 },
	tipRow: { flexDirection: "row", marginBottom: 8 },
	bullet: { fontSize: 16, marginRight: 8 },
	tipText: { flex: 1, fontSize: 14, lineHeight: 20 },
	ctaBox: {
		padding: 20,
		borderRadius: 12,
		alignItems: "flex-start",
		marginBottom: 24,
		borderWidth: 1,
		position: "relative",
		overflow: "hidden",
	},
	ctaCircle: {
		position: "absolute",
		top: -40,
		right: -40,
		width: 100,
		height: 100,
		borderRadius: 50,
		opacity: 0.15,
	},

	ctaDescription: { fontSize: 14, textAlign: "center", marginBottom: 16 },
	ctaButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 15,
		width: "100%",
	},
	ctaButtonText: { color: "#fff", fontWeight: "600" },
	relatedSection: { marginTop: 8 },
	relatedTitle: { fontSize: 20, marginBottom: 16 },
	relatedCard: {
		flexDirection: "row",
		marginBottom: 16,
		borderRadius: 8,
		overflow: "hidden",
	},
	relatedThumbContainer: {
		position: "relative",
		width: 100, // square width
		height: 70, // square height
		borderRadius: 12, // square‑roundy corners
		overflow: "hidden",
		alignSelf: "center",
	},
	relatedThumb: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	relatedPlayOverlay: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -15 }, { translateY: -15 }],
	},
	relatedDurationBadge: {
		position: "absolute",
		bottom: 4,
		right: 4,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},
	relatedDurationText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "500",
	},
	relatedInfo: {
		flex: 1,
		padding: 8,
		justifyContent: "center",
	},
	relatedCardTitle: { fontSize: 14, marginBottom: 4 },
	relatedMeta: { fontSize: 11, color: "#888" },
	backButton: {
		position: "absolute",
		top: 12,
		left: 16,
		zIndex: 10,
		borderRadius: 15,
	},
	ctaSubtitle: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "left",
		marginBottom: 8,
	},
	ctaBody: {
		fontSize: 14,
		textAlign: "left",
		marginBottom: 16,
		lineHeight: 20,
	},
	videoThumbContainer: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	playOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	relatedMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: 4,
	},
	relatedMetaText: {
		fontSize: 11,
		color: "#888",
	},
	relatedMetaDot: {
		marginHorizontal: 4,
		fontSize: 11,
		color: "#888",
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginRight: 4,
	},
	heroDurationBadge: {
		position: "absolute",
		bottom: 12,
		right: 12,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 99,
		zIndex: 10,
	},
	heroDurationText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "500",
	},
	bodyCategoryBadge: {
		marginBottom: 8,
	},
});
