import { FlatList, StyleSheet, View } from "react-native";
import BackButton from "@/components/common/navigation/BackButton";
import { BodyText, PageTitle } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import { MOCK_OFFPLAN } from "@/mock/offPlan";
import { SafeAreaView } from "react-native-safe-area-context";
import OffPlanCard from "@/components/offPlan/OffPlanCard";
import globalStyles from "@/styles/styles";
import EmptyState from "@/components/common/state/EmptyState";

export default function OffPlan() {
	const colors = useTheme();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<View style={styles.titleContainer}>
					<PageTitle style={{ marginBottom: 0 }}>Off-Plan Projects</PageTitle>
					<BodyText style={styles.subtitle}>
						Pre-construction investments with AI insights
					</BodyText>
				</View>
			</View>
			<FlatList
				data={MOCK_OFFPLAN}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <OffPlanCard property={item} />}
				contentContainerStyle={{ padding: 16, ...globalStyles.shadows }}
				ListEmptyComponent={<EmptyState title="No projects found" />}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	titleContainer: { marginLeft: 12, flex: 1 },
	subtitle: { fontSize: 12, marginTop: 2 },
});
