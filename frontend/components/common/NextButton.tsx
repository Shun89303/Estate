// components/common/NextButton.tsx
import { TouchableOpacity, StyleSheet } from "react-native";
import Title from "@/components/common/typography/Title";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

interface NextButtonProps {
	onPress: () => void;
	title?: string;
}

export default function NextButton({
	onPress,
	title = "Next →",
}: NextButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: lightColors.brand }]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Title variant="normal" style={styles.text}>
				{title}
			</Title>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: spacing.md, // 12dp scaled
		paddingHorizontal: spacing.xl, // 24dp scaled (original 40 was excessive; adjust if needed)
		borderRadius: scaleSize(15),
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "#fff",
		marginBottom: 0,
	},
});
