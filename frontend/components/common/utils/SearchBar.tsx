import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Search as SearchIcon } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";

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
	const colors = useTheme();
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
				isFocused && { borderColor: colors.border, borderWidth: 2 },
				containerStyle,
				{
					backgroundColor: colors.primaryMute,
				},
			]}
		>
			<SearchIcon size={18} color="#888" />
			<TextInput
				placeholder={placeholder}
				style={[styles.input, inputStyle]}
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
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 40,
		gap: 8,
	},
	input: {
		flex: 1,
		height: "100%",
		padding: 0,
	},
});
