// app/ad/AppAd.tsx
import { useState } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightColors } from "@/theme/light";
import Title from "@/components/common/typography/Title";
import SubTitle from "@/components/common/typography/SubTitle";
import BodyText from "@/components/common/typography/BodyText";
import StepIndicator from "@/components/common/StepIndicator";
import NextButton from "@/components/common/NextButton";
import { API_BASE_URL } from "@/config/api";
import SkipButton from "@/components/common/SkipButton";
import { spacing, scaleSize, scaleVertical } from "@/utils/metrics";

export default function AppAd() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const totalSteps = 3;

	const steps = [
		{
			image: `${API_BASE_URL}/uploads/ad/ad1.jpg`,
			title: "Marketing is ours",
			subtitle: "Deal is yours",
			body: "We drive thousands of users to the app to discover your properties. You focus on closing deals.",
		},
		{
			image: `${API_BASE_URL}/uploads/ad/ad1.jpg`,
			title: "Show rooms,\nclose deals",
			subtitle: null,
			body: "We handle the marketing. You only need to show the room on-site and manage the legal process.",
		},
		{
			image: `${API_BASE_URL}/uploads/ad/ad1.jpg`,
			title: "Your listings,\nyour control",
			subtitle: null,
			body: "Upload properties in minutes, track viewers, manage notes, and mark sold — all from your phone.",
		},
	];

	const current = steps[step - 1];
	const isLastStep = step === totalSteps;

	const handleNext = () => {
		if (isLastStep) {
			router.push("/profile/login");
		} else {
			setStep(step + 1);
		}
	};

	const handleSkip = () => {
		router.push("/profile/login");
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			{/* Upper half – Image */}
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: current.image }}
					style={styles.image}
					resizeMode="contain"
				/>
			</View>

			{/* Lower half – Content */}
			<View style={styles.contentContainer}>
				<Title variant="page" style={styles.title}>
					{current.title}
				</Title>
				{current.subtitle && (
					<SubTitle variant="normal" style={styles.subtitle}>
						{current.subtitle}
					</SubTitle>
				)}
				<BodyText variant="normal" style={styles.body}>
					{current.body}
				</BodyText>

				<StepIndicator currentStep={step} totalSteps={totalSteps} />

				<View style={styles.buttonContainer}>
					{!isLastStep ? (
						<>
							<NextButton onPress={handleNext} title="Next →" />
							<SkipButton onPress={handleSkip} />
						</>
					) : (
						<NextButton onPress={handleNext} title="Get Started →" />
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	imageContainer: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
		padding: scaleSize(20), // was 20
	},
	image: { width: "100%", height: "100%" },
	contentContainer: {
		flex: 0.5,
		paddingHorizontal: spacing.xl, // was 24
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		marginBottom: spacing.sm, // was 8
	},
	subtitle: {
		textAlign: "center",
		marginBottom: spacing.sm, // was 8
	},
	body: {
		textAlign: "center",
		marginBottom: spacing.xl, // was 24
		lineHeight: scaleVertical(22), // was 22
	},
	buttonContainer: {
		alignItems: "center",
		marginTop: spacing.sm, // was 8
	},
});
