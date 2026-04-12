// components/common/dataEntry/TextArea.tsx
import { TextInput, StyleSheet, StyleProp, TextStyle } from "react-native";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface TextAreaProps {
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	numberOfLines?: number;
	style?: StyleProp<TextStyle>; // ✅ Fixed type
	placeholderTextColor?: string;
	editable?: boolean;
}

export function TextArea({
	placeholder = "Tell clients about yourself…",
	value,
	onChangeText,
	numberOfLines = 5,
	style,
	placeholderTextColor = lightColors.bodyText,
	editable = true,
}: TextAreaProps) {
	return (
		<TextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			multiline
			numberOfLines={numberOfLines}
			editable={editable}
			style={[
				styles.textArea,
				{
					borderColor: lightColors.mutedBorder,
					color: lightColors.bodyText,
				},
				style, // ✅ Now compatible
			]}
			placeholderTextColor={placeholderTextColor}
			textAlignVertical="top"
		/>
	);
}

const styles = StyleSheet.create({
	textArea: {
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(8),
		padding: spacing.md,
		marginBottom: spacing.md,
		backgroundColor: lightColors.entireAppBackground,
		fontSize: moderateScale(14),
		minHeight: scaleSize(120),
		textAlignVertical: "top",
	},
});
