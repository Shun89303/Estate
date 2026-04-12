import { View, StyleSheet } from "react-native";
import BodyText from "@/components/common/typography/BodyText";
import Title from "@/components/common/typography/Title";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

interface StepsInfoBoxProps {
	steps: string[];
	title?: string;
}

export default function StepsInfoBox({
	steps,
	title = "WHAT HAPPENS NEXT?",
}: StepsInfoBoxProps) {
	return (
		<View style={styles.box}>
			<BodyText variant="large" style={styles.boxTitle}>
				{title}
			</BodyText>
			{steps.map((stepText, index) => (
				<View key={index} style={styles.boxStep}>
					<View style={styles.stepNumberCircle}>
						<BodyText variant="normal" style={styles.stepNumberText}>
							{index + 1}
						</BodyText>
					</View>
					<Title variant="small" style={styles.boxStepText}>
						{stepText}
					</Title>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		width: "100%",
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		padding: spacing.lg,
		marginBottom: spacing.xl,
	},
	boxTitle: {
		fontWeight: "600",
		marginBottom: spacing.md,
		textAlign: "left",
	},
	boxStep: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	stepNumberCircle: {
		width: scaleSize(28),
		height: scaleSize(28),
		borderRadius: scaleSize(14),
		backgroundColor: lightColors.brandBG,
		justifyContent: "center",
		alignItems: "center",
		marginRight: spacing.md,
		alignSelf: "flex-start",
	},
	stepNumberText: {
		color: lightColors.brand,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 0,
	},
	boxStepText: {
		flex: 1,
		color: lightColors.bigTitleText,
	},
});
