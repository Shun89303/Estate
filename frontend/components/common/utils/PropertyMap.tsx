import MapView, { Marker, Region } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import Title from "@/components/common/typography/Title";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface MapMarker {
	id: string | number;
	latitude: number;
	longitude: number;
	title?: string;
	description?: string;
	onPress?: () => void;
}

interface PropertyMapProps {
	markers: MapMarker[];
	initialRegion?: Region;
	style?: object;
	title?: string;
	titleVariant?: "page" | "normal" | "small";
}

export function PropertyMap({
	markers,
	initialRegion,
	style,
	title,
	titleVariant = "small",
}: PropertyMapProps) {
	const getDefaultRegion = (): Region => {
		if (markers.length === 0) {
			return {
				latitude: 13.736,
				longitude: 100.568,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1,
			};
		}
		if (markers.length === 1) {
			return {
				latitude: markers[0].latitude,
				longitude: markers[0].longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			};
		}
		let minLat = markers[0].latitude,
			maxLat = markers[0].latitude;
		let minLng = markers[0].longitude,
			maxLng = markers[0].longitude;
		markers.forEach((m) => {
			minLat = Math.min(minLat, m.latitude);
			maxLat = Math.max(maxLat, m.latitude);
			minLng = Math.min(minLng, m.longitude);
			maxLng = Math.max(maxLng, m.longitude);
		});
		return {
			latitude: (minLat + maxLat) / 2,
			longitude: (minLng + maxLng) / 2,
			latitudeDelta: (maxLat - minLat) * 1.2,
			longitudeDelta: (maxLng - minLng) * 1.2,
		};
	};

	const region = initialRegion || getDefaultRegion();

	return (
		<View style={[styles.container, style]}>
			{title && (
				<Title variant={titleVariant} style={styles.title}>
					{title}
				</Title>
			)}
			<View style={styles.mapWrapper}>
				{/* <MapView style={styles.map} initialRegion={region}>
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              onPress={marker.onPress}
            />
          ))}
        </MapView> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		marginBottom: spacing.lg,
	},
	title: {
		marginBottom: spacing.sm,
	},
	mapWrapper: {
		borderRadius: scaleSize(12),
		overflow: "hidden",
		height: scaleSize(200),
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
