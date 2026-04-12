// components/common/StepIndicator.tsx
import { lightColors } from "@/theme/light";
import { View, StyleSheet } from "react-native";
import { scaleSize, spacing } from "@/utils/metrics";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

export default function StepIndicator({
	currentStep,
	totalSteps,
}: StepIndicatorProps) {
	return (
		<View
			style={[
				styles.container,
				{ gap: spacing.sm, marginVertical: spacing.lg },
			]}
		>
			{Array.from({ length: totalSteps }).map((_, index) => {
				const stepNumber = index + 1;
				const isCurrent = stepNumber === currentStep;

				return (
					<View
						key={index}
						style={[
							styles.step,
							isCurrent ? styles.bar : styles.dot,
							{
								backgroundColor: isCurrent
									? lightColors.brand
									: lightColors.mutedBackground,
							},
						]}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	step: {
		height: scaleSize(4),
		borderRadius: scaleSize(2),
	},
	bar: {
		width: scaleSize(24),
		height: scaleSize(8),
		borderRadius: scaleSize(99), // large value for pill shape
	},
	dot: {
		width: scaleSize(8),
		height: scaleSize(8),
		borderRadius: scaleSize(4),
	},
});
