// app/approval.tsx
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import NextButton from "@/components/common/navigation/NextButton";
import StepsInfoBox from "@/components/common/utils/StepsInfoBox";
import { lightColors } from "@/theme/light";
import { spacing, scaleVertical } from "@/utils/metrics";
import AnimatedClockIcon from "@/components/common/animated/AnimatedClockIcon";

export default function Approval() {
	const router = useRouter();

	const steps = [
		"Our team reviews your profile (1–2 business days)",
		"You'll receive a notification once approved",
		"Start uploading & managing property listings",
	];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.centeredContent}>
					<AnimatedClockIcon
						size={32}
						color={lightColors.danger}
						backgroundColor={lightColors.dangerBackground}
						duration={10000}
						containerStyle={{
							marginBottom: scaleVertical(10),
						}}
					/>
					<Title variant="page" style={styles.title}>
						Awaiting Approval
					</Title>
					<BodyText variant="large" style={styles.subtitle}>
						Your profile has been submitted for review. An admin will verify
						your account shortly.
					</BodyText>

					<StepsInfoBox steps={steps} />
				</View>

				<NextButton
					onPress={() => router.push("/")}
					title="Back to Login"
					variant="muted"
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightColors.entireAppBackground,
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "space-around",
		padding: spacing.lg,
	},
	centeredContent: {
		alignItems: "center",
		width: "100%",
	},
	title: {
		textAlign: "center",
		marginBottom: spacing.sm,
	},
	subtitle: {
		textAlign: "center",
		marginBottom: spacing.xl,
	},
});
