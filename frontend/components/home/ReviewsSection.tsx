import { View, FlatList, StyleSheet } from "react-native";
import SectionHeader from "../common/SectionHeader";
import { MOCK_REVIEWS } from "@/mock/reviews";
import ReviewCard from "./review/ReviewCard";
import { useRouter } from "expo-router";

export default function ReviewsSection() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<SectionHeader
				title="Customer Reviews"
				subtitle="Real stories from Myanmar buyers"
				onPress={() => router.push("/reviews")}
			/>

			<FlatList
				data={MOCK_REVIEWS.slice(0, 3)}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={{ marginLeft: 16 }}>
						<ReviewCard review={item} />
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: 16 },
});
