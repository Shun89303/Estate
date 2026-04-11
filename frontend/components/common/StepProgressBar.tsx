import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface StepProgressBarProps {
	currentStep: number;
	totalSteps: number;
}

export default function StepProgressBar({
	currentStep,
	totalSteps,
}: StepProgressBarProps) {
	const colors = useTheme();

	return (
		<View style={styles.container}>
			{Array.from({ length: totalSteps }).map((_, index) => {
				const stepNumber = index + 1;
				const isCompleted = stepNumber < currentStep;
				const isCurrent = stepNumber === currentStep;

				return (
					<View
						key={index}
						style={[
							styles.segment,
							{
								backgroundColor: isCompleted
									? colors.primaryGold
									: isCurrent
										? colors.primaryGold
										: colors.primaryGray + "30",
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
		gap: 6,
		marginVertical: 10,
	},
	segment: {
		flex: 1,
		height: 4,
		borderRadius: 2,
	},
});
