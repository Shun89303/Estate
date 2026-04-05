import { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	Pressable,
} from "react-native";
import { Video } from "expo-av";
import { Review } from "@/mock/reviews";

const { width } = Dimensions.get("window");

export default function ReviewCard({ review }: { review: Review }) {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<View style={styles.card}>
			{/* THUMBNAIL OR VIDEO */}
			<View style={styles.thumbnailWrapper}>
				{isPlaying ? (
					<Video
						source={{ uri: review.video }}
						style={styles.thumbnail}
						shouldPlay
						isLooping
						useNativeControls
					/>
				) : (
					<>
						<Image
							source={{ uri: review.thumbnail }}
							style={styles.thumbnail}
						/>

						{/* DARK OVERLAY */}
						<View style={styles.overlay} />

						{/* PLAY ICON */}
						<Pressable
							style={styles.playIndicator}
							onPress={() => setIsPlaying(true)}
						>
							<Text style={styles.playText}>▶</Text>
						</Pressable>
					</>
				)}
			</View>

			{/* INFO */}
			<View style={styles.info}>
				<Text style={styles.title} numberOfLines={2}>
					{review.title}
				</Text>

				<View style={styles.bottomRow}>
					<Image source={{ uri: review.profile_image }} style={styles.avatar} />
					<View style={{ flex: 1 }}>
						<Text style={styles.name}>{review.name}</Text>
						<Text style={styles.stars}>
							{"★".repeat(review.rating)}
							{"☆".repeat(5 - review.rating)}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

/* ---------------- STYLES ---------------- */
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

	title: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 8,
	},

	bottomRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 8,
	},

	name: {
		fontSize: 12,
		color: "#333",
	},

	stars: {
		color: "#FFD700",
		fontSize: 12,
	},
});
