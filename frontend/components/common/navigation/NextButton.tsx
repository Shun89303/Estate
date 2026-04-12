// components/common/NextButton.tsx
import { TouchableOpacity, StyleSheet } from "react-native";
import Title from "@/components/common/typography/Title";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

interface NextButtonProps {
	onPress: () => void;
	title?: string;
	disabled?: boolean;
	variant?: "primary" | "muted"; // new prop
}

export default function NextButton({
	onPress,
	title = "Next →",
	disabled = false,
	variant = "primary",
}: NextButtonProps) {
	const isMuted = variant === "muted";

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					backgroundColor: disabled
						? lightColors.mutedBackground
						: isMuted
							? lightColors.background
							: lightColors.brand,
					borderWidth: isMuted ? scaleSize(1) : 0,
					borderColor: isMuted ? lightColors.mutedBorder : "transparent",
				},
			]}
			onPress={disabled ? undefined : onPress}
			activeOpacity={0.8}
			disabled={disabled}
		>
			<Title
				variant="normal"
				style={[
					styles.text,
					disabled && styles.disabledText,
					isMuted && styles.mutedText,
				]}
			>
				{title}
			</Title>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.xl,
		borderRadius: scaleSize(15),
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "#fff",
		marginBottom: 0,
	},
	disabledText: {
		opacity: 0.7,
	},
	mutedText: {
		color: lightColors.bigTitleText,
	},
});
