// components/PropertyMap.tsx
import MapView, { Marker, Region } from "react-native-maps";
import { View, StyleSheet } from "react-native";

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
}

export function PropertyMap({
	markers,
	initialRegion,
	style,
}: PropertyMapProps) {
	// If no region is provided, calculate a region that fits all markers
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
		// Calculate bounding box for multiple markers
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
			<MapView style={styles.map} initialRegion={region}>
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
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { overflow: "hidden", borderRadius: 12 },
	map: { width: "100%", height: "100%" },
});
