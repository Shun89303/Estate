import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { X } from "lucide-react-native";

interface ClearFiltersButtonProps {
	onPress: () => void;
	label?: string;
	iconColor?: string;
	textColor?: string;
}

export default function ClearFiltersButton({
	onPress,
	label = "Clear all filters",
	iconColor = "#d9534f",
	textColor = "#d9534f",
}: ClearFiltersButtonProps) {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<X size={18} color={iconColor} />
			<Text style={[styles.text, { color: textColor }]}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		paddingVertical: 8,
		borderRadius: 20,
		alignSelf: "flex-start",
		paddingHorizontal: 12,
		gap: 4,
	},
	text: {
		fontSize: 14,
		fontWeight: "500",
	},
});
