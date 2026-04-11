import { Pressable, StyleSheet } from "react-native";
import { Heart } from "lucide-react-native";

interface HeartButtonProps {
	onPress?: () => void;
	filled?: boolean;
	size?: number;
	color?: string;
	style?: object;
	borderRadius?: number;
}

export default function HeartButton({
	onPress,
	filled = false,
	size = 24,
	color = "#131620",
	style,
	borderRadius = 20,
}: HeartButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				{ borderRadius },
				pressed && styles.buttonPressed,
				style,
			]}
		>
			<Heart size={size} color={color} fill={filled ? color : "none"} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonPressed: {
		backgroundColor: "rgba(0,0,0,0.1)",
	},
});
