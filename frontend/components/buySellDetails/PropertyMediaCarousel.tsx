// src/components/PropertyMediaCarousel.tsx
import { useRef, useState } from "react";
import {
	FlatList,
	View,
	Image,
	StyleSheet,
	Dimensions,
	Button,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { PropertyMedia } from "@/stores/usePropertyStore";
import { API_BASE_URL } from "@/config/api";

const { width } = Dimensions.get("window");

export default function PropertyMediaCarousel({
	media,
}: {
	media: PropertyMedia[];
}) {
	// Sort: images first, video last
	const sortedMedia = [...media].sort((a, b) => (a.type === "video" ? 1 : -1));
	// Filter out cover if exists
	const displayMedia = sortedMedia.filter((m) => m.type !== "cover");

	return (
		<View style={styles.container}>
			<FlatList
				data={displayMedia}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, idx) => idx.toString()}
				renderItem={({ item }) =>
					item.type === "image" ? (
						<Image
							source={{ uri: `${API_BASE_URL}/${item.url}` }}
							style={styles.mainMedia}
							resizeMode="cover"
						/>
					) : (
						<VideoItem uri={`${API_BASE_URL}/${item.url}`} />
					)
				}
			/>
		</View>
	);
}

// Video item component
function VideoItem({ uri }: { uri: string }) {
	const video = useRef<Video>(null);
	const [status, setStatus] = useState<any>({});

	return (
		<View style={styles.mainMedia}>
			<Video
				ref={video}
				style={styles.mainMedia}
				source={{ uri }}
				useNativeControls
				resizeMode={ResizeMode.COVER}
				isLooping
				onPlaybackStatusUpdate={(status) => setStatus(status)}
			/>
			<View style={styles.videoButton}>
				<Button
					title={status.isPlaying ? "Pause" : "Play"}
					onPress={() =>
						status.isPlaying
							? video.current?.pauseAsync()
							: video.current?.playAsync()
					}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { width, height: 250 },
	mainMedia: { width, height: 250 },
	videoButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
	},
});
