import { View, FlatList, StyleSheet } from "react-native";
import SectionHeader from "../common/utils/SectionHeader";
import { MOCK_REVIEWS } from "@/mock/reviews";
import ReviewCard from "./review/ReviewCard";
import { useRouter } from "expo-router";
import { spacing } from "@/utils/metrics";

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
				renderItem={({ item }) => <ReviewCard review={item} />}
				contentContainerStyle={{
					paddingHorizontal: spacing.md,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: spacing.lg },
});
