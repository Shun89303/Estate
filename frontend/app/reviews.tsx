import { useRouter } from "expo-router";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	FlatList,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_REVIEWS, Review } from "@/mock/reviews";
import { useState } from "react";
import { Video } from "expo-av";

export default function Reviews() {
	const router = useRouter();
	const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

	const renderItem = ({ item }: { item: Review }) => {
		const isPlaying = activeVideoId === item.id;

		return (
			<View style={styles.card}>
				{/* Video / Thumbnail */}
				<View style={styles.thumbnailContainer}>
					{isPlaying ? (
						<Video
							source={{ uri: item.video }}
							style={styles.thumbnail}
							shouldPlay
							useNativeControls
						/>
					) : (
						<Pressable onPress={() => setActiveVideoId(item.id)}>
							<Image
								source={{ uri: item.thumbnail }}
								style={styles.thumbnail}
							/>

							<View style={styles.overlay} />

							<Text style={styles.playIcon}>▶</Text>
						</Pressable>
					)}
				</View>

				{/* Content */}
				<View style={styles.cardContent}>
					<View style={styles.profileRow}>
						<Image
							source={{ uri: item.profile_image }}
							style={styles.profileImage}
						/>
						<View style={{ flex: 1 }}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.name}>{item.name}</Text>
						</View>
					</View>

					<Text style={styles.property}>{item.property_name}</Text>

					<View style={styles.starsRow}>
						{Array.from({ length: 5 }).map((_, i) => (
							<Text key={i} style={styles.star}>
								{i < item.rating ? "★" : "☆"}
							</Text>
						))}
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.backText}>Back</Text>
			</Pressable>

			{/* Title */}
			<Text style={styles.header}>Customer Reviews</Text>
			<Text style={styles.subHeader}>Real stories from Myanmar buyers</Text>

			{/* List */}
			<FlatList
				data={MOCK_REVIEWS}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},

	backText: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 12,
	},

	header: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 4,
	},

	subHeader: {
		fontSize: 13,
		color: "#555",
		marginBottom: 16,
	},

	card: {
		marginBottom: 16,
		borderRadius: 10,
		backgroundColor: "#f9f9f9",
		overflow: "hidden",
	},

	thumbnailContainer: {
		position: "relative",
	},

	thumbnail: {
		width: "100%",
		height: 180,
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
	},

	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},

	title: {
		fontSize: 14,
		fontWeight: "600",
	},

	name: {
		fontSize: 12,
		color: "#555",
	},

	property: {
		fontSize: 12,
		color: "#777",
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
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
	},
});
