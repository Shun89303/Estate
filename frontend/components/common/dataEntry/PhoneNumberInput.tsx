import { forwardRef, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import { scaleSize, spacing, moderateScale } from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";

interface PhoneNumberInputProps extends Partial<PhoneInputProps> {
	defaultCountry?: "MM" | "TH";
	onChangePhoneNumber?: (text: string) => void;
	value?: string;
	containerStyle?: ViewStyle;
	textContainerStyle?: ViewStyle;
	flagButtonStyle?: ViewStyle;
	layout?: "first" | "second";
}

export const PhoneNumberInput = forwardRef<PhoneInput, PhoneNumberInputProps>(
	(
		{
			defaultCountry = "MM",
			onChangePhoneNumber,
			value = "",
			containerStyle,
			textContainerStyle,
			flagButtonStyle,
			layout = "second",
			...restProps
		},
		ref,
	) => {
		const colors = useTheme();
		const internalRef = useRef<PhoneInput>(null);

		const setRef = (el: PhoneInput | null) => {
			internalRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) ref.current = el;
		};

		return (
			<PhoneInput
				ref={setRef}
				defaultValue={value}
				defaultCode={defaultCountry}
				layout={layout}
				onChangeFormattedText={onChangePhoneNumber}
				containerStyle={[
					styles.container,
					{
						backgroundColor: colors.appBackground,
					},
					containerStyle,
				]}
				textContainerStyle={[
					styles.textContainer,
					{
						backgroundColor: colors.appBackground,
						borderColor: colors.primaryGray + "50",
					},
					textContainerStyle,
				]}
				flagButtonStyle={[
					styles.flagButton,
					{
						borderColor: colors.primaryGray + "50",
					},
					flagButtonStyle,
				]}
				textInputStyle={[styles.textInput, { color: colors.textPrimary }]}
				codeTextStyle={[styles.codeText, { color: colors.textPrimary }]}
				placeholder="xxx xxx xxx"
				withShadow={false}
				autoFocus={false}
				countryPickerProps={{ renderFlagButton: undefined }}
				{...restProps}
			/>
		);
	},
);

// ✅ Add display name to fix ESLint warning
PhoneNumberInput.displayName = "PhoneNumberInput";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: scaleSize(50),
		marginBottom: spacing.md,
		gap: scaleSize(10),
	},
	textContainer: {
		paddingVertical: 0,
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(15),
		paddingHorizontal: spacing.md,
	},
	flagButton: {
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(15),
		width: "30%",
	},
	textInput: {
		fontSize: moderateScale(14),
		paddingVertical: 0,
	},
	codeText: {
		fontSize: moderateScale(14),
	},
});
