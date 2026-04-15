import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Search as SearchIcon } from "lucide-react-native";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

interface SearchBarProps {
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	containerStyle?: object;
	inputStyle?: object;
}

export default function SearchBar({
	placeholder = "Search...",
	value,
	onChangeText,
	onFocus,
	onBlur,
	containerStyle,
	inputStyle,
}: SearchBarProps) {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
		onFocus?.();
	};

	const handleBlur = () => {
		setIsFocused(false);
		onBlur?.();
	};

	return (
		<View
			style={[
				styles.container,
				containerStyle,
				{
					backgroundColor: lightColors.mutedBackgroundWeaker,
					borderColor: lightColors.mutedBorder,
				},
				isFocused && {
					borderColor: lightColors.quarterWeakBrand,
					borderWidth: scaleSize(3),
				},
			]}
		>
			<SearchIcon size={moderateScale(18)} color={lightColors.bodyText} />
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={lightColors.bodyText}
				style={[styles.input, { color: lightColors.bigTitleText }, inputStyle]}
				value={value}
				onChangeText={onChangeText}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(8),
		paddingHorizontal: spacing.sm,
		height: scaleSize(40),
		gap: scaleSize(8),
	},
	input: {
		flex: 1,
		height: "100%",
		padding: 0,
		fontSize: moderateScale(14),
	},
});
