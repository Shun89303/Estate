import { ScrollView, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import SubTitle from "../typography/SubTitle";

export default function PropertyPurposeFilter() {
	const router = useRouter();

	const purposes = [
		{ emoji: "🏪", label: "Buy Business", route: "/(tabs)/search" },
		{ emoji: "📈", label: "For Investment", route: "/(tabs)/search" },
		{ emoji: "🏠", label: "For Living", route: "/(tabs)/search" },
		{ emoji: "🔑", label: "For Rent", route: "/(tabs)/search" },
		{ emoji: "🛂", label: "For Long Stay Visa", route: "/(tabs)/search" },
	];

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{purposes.map((purpose, index) => (
				<Pressable
					key={index}
					onPress={() => router.push(purpose.route as any)}
					style={[
						styles.item,
						{
							backgroundColor: lightColors.brandBG,
							borderColor: lightColors.brandBorder,
						},
					]}
				>
					<SubTitle
						style={{
							marginBottom: 0,
						}}
					>
						{purpose.emoji} {purpose.label}
					</SubTitle>
				</Pressable>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 0,
		marginVertical: spacing.md,
	},
	contentContainer: {
		paddingHorizontal: spacing.lg,
		gap: scaleSize(10),
	},
	item: {
		borderWidth: scaleSize(1),
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: scaleSize(15),
	},
});
