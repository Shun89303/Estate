import { View } from "react-native";
import SectionHeader from "../common/SectionHeader";
import PropertyCard from "@/components/home/property/PropertyCard";
import { useRouter } from "expo-router";
import { MOCK_BUYSELL } from "@/mock/buySell";

export default function FeaturedSection() {
	const data = MOCK_BUYSELL.slice(0, 3);
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
