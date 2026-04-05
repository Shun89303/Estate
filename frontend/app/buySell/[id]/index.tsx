import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { Property } from "@/stores/usePropertyStore";

import ActionButtons from "@/components/buySellDetails/ActionButtons";
import PropertyMediaCarousel from "@/components/buySellDetails/PropertyMediaCarousel";
import PropertyInfo from "@/components/buySellDetails/PropertyInfo";
import PropertyFeatures from "@/components/buySellDetails/PropertyFeatures";
import PropertyAgent from "@/components/buySellDetails/PropertyAgent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ConsultationFee from "@/components/buySellDetails/ConsultationFee";
import ConsultationButtons from "@/components/buySellDetails/ConsultationButtons";
import PropertyMap from "@/components/buySellDetails/PropertyMap";
import { MOCK_PROPERTIES } from "@/mock/properties";

export default function BuySellDetails() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_PROPERTIES.find(
			(p) => p.id?.toString() === id.toString(),
		);
		setProperty(found || null);
	}, [id]);

	if (!property)
		return (
			<SafeAreaView>
				<Pressable onPress={() => router.back()}>
					<Text style={{ fontSize: 12, fontWeight: "500" }}>Back</Text>
				</Pressable>
				<Text style={{ padding: 16 }}>Loading property...</Text>
			</SafeAreaView>
		);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				{/* Back / Save / Share buttons */}
				<ActionButtons />

				{/* Media carousel */}
				<PropertyMediaCarousel media={property.media || []} />

				{/* Core info: price, name, location, bedrooms, bathrooms, area, floor */}
				<PropertyInfo property={property} />

				{/* Features & About */}
				<PropertyFeatures property={property} />

				{/* Map location */}
				<PropertyMap property={property} />

				{/* Agent info */}
				<PropertyAgent property={property} />

				{/* Consultation & Reserve */}
				<ConsultationFee property={property} />
			</ScrollView>
			<ConsultationButtons property={property} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	section: { marginTop: 16, paddingHorizontal: 16 },
	sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
	mapPlaceholder: {
		height: 200,
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
	},
});
