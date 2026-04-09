import { useState, useEffect } from "react";
import {
	View,
	Text,
	Pressable,
	ScrollView,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Heart, Share2, Image as ImageIcon } from "lucide-react-native";
import BackButton from "./BackButton";
import { useTheme } from "@/hooks/useTheme";
import { NormalTitle, SmallTitle, BodyText } from "../atoms/Typography";

export interface MediaCarouselProps {
	cover: string;
	images: string[];
	videos: string[];
	onLike?: () => void;
	onShare?: () => void;
	showBack?: boolean;
	showLike?: boolean;
	showShare?: boolean;
	isOffPlan?: boolean;
	offPlanData?: {
		uniqueCode: string;
		title: string;
		developerName: string;
		description?: string;
	};
	style?: object;
}

export default function MediaCarousel({
	cover,
	images,
	videos,
	onLike,
	onShare,
	showBack = true,
	showLike = true,
	showShare = true,
	isOffPlan = false,
	offPlanData,
	style,
}: MediaCarouselProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	const colors = useTheme();

	const mediaItems = [cover, ...images, ...videos];
	const isVideo = (index: number) => index >= images.length + 1;
	const hasCover = cover ? 1 : 0;
	const photoCount = images.length + hasCover;
	const videoCount = videos.length;

	// Create video player for the currently active video
	const currentVideoUrl = isVideo(activeIndex) ? mediaItems[activeIndex] : null;
	const player = useVideoPlayer(currentVideoUrl || "", (player) => {
		player.loop = true;
	});

	// Reset player when active index changes to a video
	useEffect(() => {
		if (currentVideoUrl) {
			player
				.replaceAsync(currentVideoUrl)
				.then(() => {
					player.play();
				})
				.catch((error) => {
					console.error("Failed to load video:", error);
				});
			player.loop = true;
		}
	}, [activeIndex, currentVideoUrl, player]);

	return (
		<View style={[styles.container, style]}>
			<View style={styles.carouselContainer}>
				{isVideo(activeIndex) ? (
					<VideoView
						player={player}
						style={styles.carouselImage}
						nativeControls
						contentFit="cover"
					/>
				) : (
					<Image
						source={{ uri: mediaItems[activeIndex] }}
						style={styles.carouselImage}
						resizeMode="cover"
					/>
				)}

				{/* Dark overlay */}
				<View style={styles.darkOverlay} />

				{showBack && <BackButton style={styles.backButton} />}

				<View style={styles.rightButtons}>
					{showLike && (
						<Pressable onPress={onLike} style={styles.iconButton}>
							<Heart size={24} color="black" />
						</Pressable>
					)}
					{showShare && (
						<Pressable onPress={onShare} style={styles.iconButton}>
							<Share2 size={24} color="black" />
						</Pressable>
					)}
				</View>

				{/* OFF‑PLAN OVERLAY (unchanged) */}
				{isOffPlan && offPlanData && (
					<View style={styles.offPlanOverlay}>
						<View style={styles.offPlanTopRow}>
							<View
								style={[styles.badge, { backgroundColor: colors.primaryGold }]}
							>
								<SmallTitle style={styles.badgeText}>OFF-PLAN</SmallTitle>
							</View>
							<BodyText style={styles.offPlanCode}>
								{offPlanData.uniqueCode}
							</BodyText>
						</View>
						<NormalTitle style={styles.offPlanTitle}>
							{offPlanData.title}
						</NormalTitle>
						<BodyText style={styles.offPlanDeveloper}>
							{offPlanData.developerName}
						</BodyText>
						{offPlanData.description && (
							<BodyText style={styles.offPlanDescription}>
								{offPlanData.description}
							</BodyText>
						)}
					</View>
				)}

				<View style={styles.mediaCountBadge}>
					<ImageIcon size={12} color="#fff" style={{ marginRight: 4 }} />
					<Text style={styles.mediaCountText}>
						{photoCount} photo{photoCount !== 1 ? "s" : ""}
						{videoCount > 0 &&
							` • ${videoCount} video${videoCount !== 1 ? "s" : ""}`}
					</Text>
				</View>

				<View style={styles.dotIndicator}>
					{mediaItems.map((_, idx) => (
						<TouchableOpacity
							key={idx}
							onPress={() => setActiveIndex(idx)}
							style={[styles.dot, activeIndex === idx && styles.dotActive]}
						/>
					))}
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.thumbnailStrip}
				contentContainerStyle={styles.thumbnailContent}
			>
				{mediaItems.map((item, idx) => (
					<TouchableOpacity
						key={idx}
						onPress={() => setActiveIndex(idx)}
						style={[
							styles.thumbnail,
							activeIndex === idx && [
								styles.thumbnailActive,
								{ borderColor: colors.primaryGold },
							],
						]}
					>
						<Image source={{ uri: item }} style={styles.thumbnailImage} />
						{isVideo(idx) && (
							<View style={styles.playOverlay}>
								<Text style={styles.playText}>▶</Text>
							</View>
						)}
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { width: "100%" },
	carouselContainer: { width: "100%", height: 250, position: "relative" },
	carouselImage: { width: "100%", height: "100%" },
	darkOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		zIndex: 5,
		pointerEvents: "none",
	},
	backButton: {
		position: "absolute",
		top: 12,
		left: 16,
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 10,
		zIndex: 10,
	},
	rightButtons: {
		position: "absolute",
		top: 12,
		right: 16,
		flexDirection: "row",
		gap: 12,
		zIndex: 10,
	},
	iconButton: {
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 10,
	},
	offPlanOverlay: {
		position: "absolute",
		bottom: 40,
		left: 16,
		right: 16,
		zIndex: 10,
	},
	offPlanTopRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 99,
		alignSelf: "flex-start",
	},
	badgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	offPlanCode: {
		color: "#fff",
		fontSize: 12,
	},
	offPlanTitle: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 2,
	},
	offPlanDeveloper: {
		color: "#fff",
		fontSize: 12,
		marginTop: 2,
	},
	offPlanDescription: {
		color: "#fff",
		fontSize: 12,
		marginTop: 4,
		maxWidth: "80%",
	},
	mediaCountBadge: {
		position: "absolute",
		bottom: 12,
		right: 12,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 20,
		zIndex: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	mediaCountText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "500",
	},
	dotIndicator: {
		position: "absolute",
		bottom: 12,
		left: 12,
		flexDirection: "row",
		gap: 6,
		zIndex: 10,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "rgba(255,255,255,0.6)",
	},
	dotActive: { backgroundColor: "#fff", width: 12, borderRadius: 6 },
	thumbnailStrip: { flexGrow: 0, marginVertical: 12, paddingHorizontal: 16 },
	thumbnailContent: { gap: 8 },
	thumbnail: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		overflow: "hidden",
	},
	thumbnailActive: { borderWidth: 2 },
	thumbnailImage: { width: 50, height: 50, borderRadius: 4 },
	playOverlay: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -10 }, { translateY: -10 }],
		backgroundColor: "rgba(0,0,0,0.6)",
		borderRadius: 12,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	playText: { color: "#fff", fontSize: 10 },
	videoContainer: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	customPlayButton: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -20 }, { translateY: -20 }],
		backgroundColor: "rgba(0,0,0,0.6)",
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 20,
	},
	playIcon: {
		color: "#fff",
		fontSize: 20,
		marginLeft: 3, // slight offset for visual centering
	},
});
