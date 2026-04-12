import { FlatList, View, StyleSheet } from "react-native";
import SectionHeader from "../common/utils/SectionHeader";
import { useRouter } from "expo-router";
import { MOCK_BUYSELL } from "@/mock/buySell";
import HomePropertyCard from "./property/HomePropertyCard";

export default function FeaturedSection() {
	const data = MOCK_BUYSELL.slice(0, 3);
	const router = useRouter();

	return (
		<View style={styles.container}>
			<SectionHeader
				title="Featured Listings"
				onPress={() => router.push("/(tabs)/search")}
			/>

			<FlatList
				scrollEnabled={false}
				data={data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <HomePropertyCard property={item} />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				snapToAlignment="start"
				decelerationRate="fast"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	listContent: {
		paddingHorizontal: 16,
		gap: 12,
	},
});
