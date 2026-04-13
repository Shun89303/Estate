import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface BackButtonProps {
	onPress?: () => void;
	iconSize?: number;
	iconColor?: string;
	style?: object;
}

export default function BackButton({
	onPress,
	iconSize = 24,
	iconColor = "#131620",
	style,
}: BackButtonProps) {
	const router = useRouter();

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			router.back();
		}
	};

	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => [
				styles.button,
				pressed && styles.buttonPressed,
				style,
			]}
		>
			<ArrowLeft size={moderateScale(iconSize)} color={iconColor} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: spacing.sm, // was 10
		borderRadius: scaleSize(10),
		justifyContent: "center",
		alignItems: "center",
	},
	buttonPressed: {
		backgroundColor: lightColors.mutedBackground, // use theme instead of hardcoded #e0e0e0
	},
});
