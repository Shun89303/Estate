import {
	View,
	TouchableOpacity,
	StyleSheet,
	ViewStyle,
	TextStyle,
} from "react-native";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

interface ChipSelectorProps {
	/** Array of options to display */
	options: string[];
	/** Currently selected value(s): string for single, string[] for multiple */
	selected: string | string[] | null;
	/** Callback when selection changes */
	onSelect: (value: string | string[]) => void;
	/** Selection mode */
	mode: "single" | "multiple";
	/** Optional custom chip style */
	chipStyle?: ViewStyle;
	/** Optional custom selected chip style */
	selectedChipStyle?: ViewStyle;
	/** Optional custom text style */
	textStyle?: TextStyle;
	/** Optional custom selected text style */
	selectedTextStyle?: TextStyle;
}

export function ChipSelector({
	options,
	selected,
	onSelect,
	mode,
	chipStyle,
	selectedChipStyle,
	textStyle,
	selectedTextStyle,
}: ChipSelectorProps) {
	const handlePress = (option: string) => {
		if (mode === "single") {
			onSelect(option);
		} else {
			// multiple mode
			const current = Array.isArray(selected) ? selected : [];
			if (current.includes(option)) {
				onSelect(current.filter((item) => item !== option));
			} else {
				onSelect([...current, option]);
			}
		}
	};

	const isSelected = (option: string): boolean => {
		if (mode === "single") {
			return selected === option;
		} else {
			return Array.isArray(selected) && selected.includes(option);
		}
	};

	return (
		<View style={styles.container}>
			{options.map((option) => {
				const selectedFlag = isSelected(option);
				return (
					<TouchableOpacity
						key={option}
						onPress={() => handlePress(option)}
						style={[
							styles.chip,
							chipStyle,
							selectedFlag && styles.chipSelected,
							selectedFlag && selectedChipStyle,
						]}
					>
						<BodyText
							variant="normal"
							style={[
								styles.chipText,
								textStyle,
								selectedFlag && styles.chipTextSelected,
								selectedFlag && selectedTextStyle,
							]}
						>
							{option}
						</BodyText>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: spacing.md,
		alignItems: "center",
	},
	chip: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: scaleSize(10),
		marginRight: spacing.sm,
		marginBottom: spacing.sm,
		backgroundColor: "#fff",
	},
	chipSelected: {
		backgroundColor: lightColors.brand,
		borderColor: lightColors.brand,
	},
	chipText: {
		color: lightColors.bigTitleText,
		marginBottom: 0,
	},
	chipTextSelected: {
		color: "#fff",
	},
});
