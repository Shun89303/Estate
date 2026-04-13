import { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Review } from "@/mock/reviews";
import { spacing, scaleSize } from "@/utils/metrics";
import BodyText from "@/components/common/typography/BodyText";
import Title from "@/components/common/typography/Title";
import { lightColors } from "@/theme/light";

const { width } = Dimensions.get("window");

export default function ReviewCard({ review }: { review: Review }) {
	const [isPlaying, setIsPlaying] = useState(false);

	const player = useVideoPlayer("", (player) => {
		player.loop = true;
	});

	useEffect(() => {
		if (isPlaying && review.video) {
			player
				.replaceAsync(review.video)
				.then(() => player.play())
				.catch(console.error);
		} else if (!isPlaying && player.playing) {
			player.pause();
		}
	}, [isPlaying, review.video]);

	return (
		<View style={styles.card}>
			<View style={styles.thumbnailWrapper}>
				{isPlaying ? (
					<VideoView
						player={player}
						style={[styles.thumbnail, styles.video]}
						nativeControls
						contentFit="cover"
					/>
				) : (
					<>
						<Image
							source={{ uri: review.thumbnail }}
							style={styles.thumbnail}
						/>
						<View style={styles.overlay} />
						<Pressable
							style={styles.playIndicator}
							onPress={() => setIsPlaying(true)}
						>
							<BodyText variant="normal" style={styles.playText}>
								▶
							</BodyText>
						</Pressable>
						<View style={styles.durationBadge}>
							<BodyText variant="small" style={styles.durationText}>
								{review.duration}
							</BodyText>
						</View>
					</>
				)}
			</View>

			<View style={styles.info}>
				<View style={styles.row}>
					<Image source={{ uri: review.profile_image }} style={styles.avatar} />
					<View style={styles.textColumn}>
						<Title variant="small" numberOfLines={1}>
							{review.title}
						</Title>
						<View style={styles.nameRatingRow}>
							<BodyText style={{ marginBottom: 0 }}>{review.name}</BodyText>
							<BodyText style={styles.dot}>•</BodyText>
							<BodyText style={styles.stars}>
								{"★".repeat(review.rating)}
								{"☆".repeat(5 - review.rating)}
							</BodyText>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: width * 0.7,
		borderRadius: scaleSize(12),
		overflow: "hidden",
		backgroundColor: lightColors.entireAppBackground,
		marginRight: spacing.lg,
	},
	thumbnailWrapper: {
		position: "relative",
		width: "100%",
		height: scaleSize(200),
	},
	thumbnail: {
		width: "100%",
		height: "100%",
		borderRadius: scaleSize(12), // all four corners rounded
	},
	video: {
		// additional video-specific styles if needed
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		borderRadius: scaleSize(12), // match image corners for overlay
	},
	playIndicator: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -scaleSize(20) }, { translateY: -scaleSize(20) }],
		backgroundColor: lightColors.background,
		width: scaleSize(40),
		height: scaleSize(40),
		borderRadius: scaleSize(20),
		justifyContent: "center",
		alignItems: "center",
	},
	playText: {
		color: lightColors.bigTitleText,
		marginBottom: 0,
	},
	durationBadge: {
		position: "absolute",
		bottom: spacing.sm,
		right: spacing.sm,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(4),
		borderRadius: scaleSize(6),
	},
	durationText: {
		color: lightColors.background,
		marginBottom: 0,
	},
	info: {
		padding: spacing.md,
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	avatar: {
		width: scaleSize(40),
		height: scaleSize(40),
		borderRadius: scaleSize(20),
		marginRight: spacing.sm,
	},
	textColumn: {
		flex: 1,
	},
	nameRatingRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	dot: {
		marginHorizontal: scaleSize(6),
		marginBottom: 0,
	},
	stars: {
		color: "#FFD700",
		marginBottom: 0,
	},
});
