import {
	View,
	Pressable,
	StyleSheet,
	FlatList,
	Image,
	Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_REVIEWS, Review } from "@/mock/reviews";
import { useState, useEffect } from "react";
import { VideoView, useVideoPlayer } from "expo-video";
import BackButton from "@/components/common/navigation/BackButton";
import { useTheme } from "@/hooks/useTheme";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import globalStyles from "@/styles/styles";

export default function Reviews() {
	const colors = useTheme();
	const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

	const currentReview = MOCK_REVIEWS.find((r) => r.id === activeVideoId);
	const currentVideoUrl = currentReview?.video || "";

	const player = useVideoPlayer(currentVideoUrl, (player) => {
		player.loop = true;
	});

	useEffect(() => {
		if (currentVideoUrl) {
			player
				.replaceAsync(currentVideoUrl)
				.then(() => player.play())
				.catch(console.error);
		}
	}, [currentVideoUrl]);

	const renderItem = ({ item }: { item: Review }) => {
		const isPlayingVideo = activeVideoId === item.id;

		return (
			<View style={[styles.card, { backgroundColor: colors.background }]}>
				<View style={styles.thumbnailContainer}>
					{isPlayingVideo ? (
						<VideoView
							player={player}
							style={styles.thumbnail}
							nativeControls
							contentFit="cover"
						/>
					) : (
						<Pressable
							onPress={() => setActiveVideoId(item.id)}
							style={styles.thumbnailPressable}
						>
							<Image
								source={{ uri: item.thumbnail }}
								style={styles.thumbnail}
							/>
							<View style={styles.overlay} />
							<Text style={styles.playIcon}>▶</Text>
							<View style={styles.durationBadge}>
								<BodyText style={styles.durationText}>{item.duration}</BodyText>
							</View>
						</Pressable>
					)}
				</View>

				<View style={styles.cardContent}>
					<View style={styles.profileRow}>
						<Image
							source={{ uri: item.profile_image }}
							style={styles.profileImage}
						/>
						<View style={{ flex: 1 }}>
							<NormalTitle numberOfLines={1} style={styles.title}>
								{item.title}
							</NormalTitle>
							<View style={styles.namePropertyRow}>
								<BodyText style={styles.name}>{item.name}</BodyText>
								<BodyText style={styles.dot}>•</BodyText>
								<BodyText style={styles.propertyName}>
									{item.property_name}
								</BodyText>
							</View>
							<View style={styles.starsRow}>
								{Array.from({ length: 5 }).map((_, i) => (
									<Text key={i} style={styles.star}>
										{i < item.rating ? "★" : "☆"}
									</Text>
								))}
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<View style={styles.headerTextContainer}>
					<PageTitle style={styles.header}>Customer Reviews</PageTitle>
					<BodyText style={styles.subHeader}>
						Real stories from Myanmar buyers
					</BodyText>
				</View>
			</View>

			<FlatList
				data={MOCK_REVIEWS}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 16,
	},
	headerTextContainer: {
		flex: 1,
	},
	header: {
		marginBottom: 2,
	},
	subHeader: {
		fontSize: 12,
	},
	card: {
		marginBottom: 16,
		borderRadius: 12,
		...globalStyles.shadows,
	},
	thumbnailContainer: {
		position: "relative",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: "hidden",
	},
	thumbnailPressable: {
		position: "relative",
	},
	thumbnail: {
		width: "100%",
		height: 180,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	playIcon: {
		position: "absolute",
		top: "45%",
		left: "45%",
		fontSize: 24,
		color: "#fff",
	},
	cardContent: {
		padding: 12,
	},
	profileRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		gap: 10,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	title: {
		marginBottom: 2,
	},
	name: {
		fontSize: 12,
	},
	property: {
		fontSize: 12,
		marginBottom: 6,
	},
	starsRow: {
		flexDirection: "row",
	},
	star: {
		fontSize: 14,
		color: "#f5a623",
		marginRight: 2,
	},
	durationBadge: {
		position: "absolute",
		bottom: 8,
		right: 8,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 99,
	},
	durationText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "500",
	},
	namePropertyRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		marginBottom: 6,
	},
	dot: {
		marginHorizontal: 4,
		fontSize: 12,
	},
	propertyName: {
		fontSize: 12,
		color: "#666",
	},
});
