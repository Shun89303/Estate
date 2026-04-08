import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

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
			<ArrowLeft size={iconSize} color={iconColor} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonPressed: {
		backgroundColor: "#e0e0e0",
	},
});
