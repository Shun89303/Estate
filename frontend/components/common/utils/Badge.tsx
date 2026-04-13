import { View, StyleSheet, ViewStyle } from "react-native";
import Title from "@/components/common/typography/Title";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface BadgeProps {
	label: string;
	color?: string; // text color
	backgroundColor?: string;
	style?: ViewStyle; // optional extra styles (e.g., position absolute)
	textVariant?: "page" | "normal" | "small";
}

export default function Badge({
	label,
	color = "#fff",
	backgroundColor = lightColors.brand,
	style,
	textVariant = "small",
}: BadgeProps) {
	return (
		<View style={[styles.badge, { backgroundColor }, style]}>
			<Title variant={textVariant} style={[styles.text, { color }]}>
				{label}
			</Title>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(4),
		borderRadius: scaleSize(99),
		alignSelf: "flex-start",
	},
	text: {
		marginBottom: 0,
	},
});
