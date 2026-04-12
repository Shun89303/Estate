import { View, StyleSheet, TextStyle } from "react-native";
import SubTitle from "@/components/common/typography/SubTitle";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

interface TextChipProps {
	text: string;
	style?: object;
	textStyle?: TextStyle;
}

export default function TextChip({ text, style, textStyle }: TextChipProps) {
	const finalTextStyle = textStyle
		? StyleSheet.flatten([styles.text, textStyle])
		: styles.text;

	return (
		<View style={[styles.container, style]}>
			<SubTitle variant="normal" style={finalTextStyle}>
				{text}
			</SubTitle>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: lightColors.brandBG,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: scaleSize(12),
		alignSelf: "center",
	},
	text: {
		marginBottom: 0,
		color: lightColors.brand,
	},
});
