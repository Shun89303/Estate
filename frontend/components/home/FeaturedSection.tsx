import { View } from "react-native";
import SectionHeader from "../common/SectionHeader";
import { MOCK_PROPERTIES } from "@/mock/properties";
import PropertyCard from "@/components/home/property/PropertyCard";
import { useRouter } from "expo-router";

export default function FeaturedSection() {
	const data = MOCK_PROPERTIES.slice(0, 3);
	const router = useRouter();

	return (
		<View style={{ marginBottom: 16 }}>
			<SectionHeader
				title="Featured Listings"
				onPress={() => router.push("/(tabs)/search")}
			/>

			{data.map((property) => (
				<PropertyCard key={property.id} property={property} />
			))}
		</View>
	);
}
