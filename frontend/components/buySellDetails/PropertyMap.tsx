import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Property } from "@/stores/usePropertyStore";

interface PropertyMapProps {
	property: Property;
}

export default function PropertyMap({ property }: PropertyMapProps) {
	if (!property.latitude || !property.longitude) {
		return (
			<View style={styles.placeholder}>
				<Text>No location data available</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Location</Text>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: property.latitude,
					longitude: property.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				{/* <Marker
					coordinate={{
						latitude: property.latitude,
						longitude: property.longitude,
					}}
					title={property.name}
					description={property.location_text}
				/> */}
				<Marker
					coordinate={{
						latitude: property.latitude,
						longitude: property.longitude,
					}}
					pinColor="#007bff" // optional: change marker color
				>
					<Callout tooltip>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutName}>{property.name}</Text>
							<Text style={styles.calloutLocation}>
								{property.location_text}
							</Text>
							<Text style={styles.calloutPrice}>
								฿{property.price ? property.price.toLocaleString("en-US") : 0}
							</Text>
						</View>
					</Callout>
				</Marker>
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginTop: 16, paddingHorizontal: 16 },
	title: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
	map: { height: 200, width: "100%", borderRadius: 12 },
	placeholder: {
		height: 200,
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		marginTop: 16,
		paddingHorizontal: 16,
	},
	calloutContainer: {
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#007bff",
		alignItems: "center",
		elevation: 2, // Android shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	calloutName: { fontSize: 12, fontWeight: "bold" },
	calloutLocation: {
		fontSize: 10,
		color: "#555",
		marginVertical: 2,
		textAlign: "center",
	},
	calloutPrice: { fontSize: 12, color: "#007bff", fontWeight: "600" },
});
