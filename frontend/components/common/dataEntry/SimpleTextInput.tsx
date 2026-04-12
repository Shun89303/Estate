import { TextInput, StyleSheet, StyleProp, TextStyle } from "react-native";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface SimpleTextInputProps {
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	style?: StyleProp<TextStyle>;
	placeholderTextColor?: string;
	editable?: boolean;
	secureTextEntry?: boolean;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export function SimpleTextInput({
	placeholder = "",
	value,
	onChangeText,
	style,
	placeholderTextColor = lightColors.bodyText,
	editable = true,
	secureTextEntry = false,
	keyboardType = "default",
}: SimpleTextInputProps) {
	return (
		<TextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			editable={editable}
			secureTextEntry={secureTextEntry}
			keyboardType={keyboardType}
			style={[
				styles.input,
				{
					borderColor: lightColors.mutedBorder,
					color: lightColors.bigTitleText,
				},
				style,
			]}
			placeholderTextColor={placeholderTextColor}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(8),
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		fontSize: moderateScale(14),
		backgroundColor: lightColors.entireAppBackground,
	},
});
