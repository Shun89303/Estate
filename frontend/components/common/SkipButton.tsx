import { TouchableOpacity, StyleSheet } from "react-native";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing } from "@/utils/metrics";

interface SkipButtonProps {
	onPress: () => void;
	title?: string;
}

export default function SkipButton({
	onPress,
	title = "Skip",
}: SkipButtonProps) {
	return (
		<TouchableOpacity
			style={styles.button}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<BodyText variant="large" style={styles.text}>
				{title}
			</BodyText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: spacing.sm, // 8dp – comfortable tap area
		paddingHorizontal: spacing.md, // 12dp
	},
	text: {
		color: lightColors.bodyText,
		fontWeight: "600", // stronger than normal BodyText (which is 400)
		textAlign: "center",
	},
});
