import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";
import { Search } from "lucide-react-native";
import globalStyles from "@/styles/styles";
import BodyText from "../common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

export default function SearchBar() {
	const router = useRouter();

	return (
		<Pressable
			style={styles.container}
			onPress={() => router.push("/(tabs)/search")}
		>
			<View style={[styles.fakeInput, globalStyles.shadows]}>
				<Search size={moderateScale(18)} color={lightColors.bodyText} />
				<BodyText variant="large" style={styles.placeholder}>
					Search by location or name...
				</BodyText>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.md,
	},
	fakeInput: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(15),
		paddingVertical: scaleSize(10),
		paddingHorizontal: spacing.lg,
		gap: scaleSize(8),
	},
	placeholder: {
		flex: 1,
		marginBottom: 0,
	},
});
