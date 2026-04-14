// components/common/utils/ClearFiltersButton.tsx
import { TouchableOpacity, StyleSheet } from "react-native";
import { X } from "lucide-react-native";
import BodyText from "../typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

interface ClearFiltersButtonProps {
	onPress: () => void;
	label?: string;
	iconColor?: string;
	textColor?: string;
}

export default function ClearFiltersButton({
	onPress,
	label = "Clear all filters",
	iconColor = lightColors.brand,
	textColor = lightColors.brand,
}: ClearFiltersButtonProps) {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<X size={moderateScale(18)} color={iconColor} />
			<BodyText variant="large" style={{ color: textColor, marginBottom: 0 }}>
				{label}
			</BodyText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: scaleSize(8),
		borderRadius: scaleSize(20),
		alignSelf: "flex-start",
		paddingHorizontal: spacing.md,
		gap: scaleSize(4),
	},
});
