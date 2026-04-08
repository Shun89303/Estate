import { ScrollView, StyleSheet } from "react-native";

import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import TypeFilter from "@/components/home/TypeFilter";
import PurposeFilter from "@/components/home/PurposeFilter";
import FeaturedSection from "@/components/home/FeaturedSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ContentsSection from "@/components/home/ContentsSection";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
	const colors = useTheme();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={[
					styles.container,
					{
						backgroundColor: colors.appBackground,
					},
				]}
			>
				<Header />
				<SearchBar />
				<TypeFilter />
				<PurposeFilter />

				<FeaturedSection />
				<ReviewsSection />
				<ContentsSection />

				<ConsultationCTA />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, marginBottom: 50 },
});
