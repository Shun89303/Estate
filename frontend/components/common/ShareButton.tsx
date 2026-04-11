import { Pressable, StyleSheet } from "react-native";
import { Share2 } from "lucide-react-native";

interface ShareButtonProps {
	onPress?: () => void;
	size?: number;
	color?: string;
	style?: object;
	borderRadius?: number;
}

export default function ShareButton({
	onPress,
	size = 24,
	color = "#131620",
	style,
	borderRadius = 20,
}: ShareButtonProps) {
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
			<Share2 size={size} color={color} />
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
