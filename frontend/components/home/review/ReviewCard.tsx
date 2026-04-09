import { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Review } from "@/mock/reviews";
import { BodyText, SmallTitle } from "@/components/atoms/Typography";

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
						style={styles.thumbnail}
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
							<Text style={styles.playText}>▶</Text>
						</Pressable>
					</>
				)}
			</View>

			<View style={styles.info}>
				<View style={styles.row}>
					<Image source={{ uri: review.profile_image }} style={styles.avatar} />
					<View style={styles.textColumn}>
						<SmallTitle numberOfLines={1} style={styles.title}>
							{review.title}
						</SmallTitle>
						<View style={styles.nameRatingRow}>
							<BodyText>{review.name}</BodyText>
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
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#fff",
		marginRight: 16,
	},
	thumbnailWrapper: {
		position: "relative",
		width: "100%",
		height: 200,
	},
	thumbnail: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	playIndicator: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -12 }, { translateY: -12 }],
		backgroundColor: "rgba(0,0,0,0.6)",
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	playText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
	info: {
		padding: 12,
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	textColumn: {
		flex: 1,
	},
	title: {
		marginBottom: 4,
		lineHeight: 18,
	},
	nameRatingRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	dot: {
		marginHorizontal: 6,
		color: "#999",
		fontSize: 12,
	},
	stars: {
		color: "#FFD700",
		fontSize: 12,
	},
});
