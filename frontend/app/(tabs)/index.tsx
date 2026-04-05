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

export default function Home() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
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
	container: { flex: 1, backgroundColor: "#fff", marginBottom: 50 },
});
