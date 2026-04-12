import { View, StyleSheet } from "react-native";
import SectionHeader from "../common/utils/SectionHeader";
import { MOCK_CONTENTS } from "@/mock/contents";
import { useRouter } from "expo-router";
import HomeContentCard from "./content/HomeContentCard";

export default function ContentsSection() {
	const data = MOCK_CONTENTS.slice(0, 3);
	const router = useRouter();

	return (
		<View style={styles.container}>
			<SectionHeader
				title="Contents"
				subtitle="Guides, tips & videos for buyers"
				onPress={() => router.push("/content/contents")}
			/>

			{data.map((content) => (
				<View key={content.id} style={{ paddingHorizontal: 16 }}>
					<HomeContentCard
						item={content}
						onPress={() => router.push("/content/contents")}
					/>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: 16 },
});
