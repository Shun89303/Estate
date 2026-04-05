import { View, StyleSheet } from "react-native";
import SectionHeader from "../common/SectionHeader";
import { MOCK_CONTENTS } from "@/mock/contents";
import ContentCard from "./content/ContentCard";
import { useRouter } from "expo-router";

export default function ContentsSection() {
	const data = MOCK_CONTENTS.slice(0, 3);
	const router = useRouter();

	return (
		<View style={styles.container}>
			<SectionHeader
				title="Contents"
				onPress={() => router.push("/contents")}
			/>

			{data.map((content) => (
				<View key={content.id} style={{ paddingHorizontal: 16 }}>
					<ContentCard content={content} />
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: 16 },
});
