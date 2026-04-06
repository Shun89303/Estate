import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppAd() {
	const router = useRouter();
	const [step, setStep] = useState(1);

	const steps = [
		{
			title: "Marketing is ours",
			subtitle: "Deal is yours",
			body: "We drive thousands of users to the app to discover your properties. You focus on closing deals.",
		},
		{
			title: "Show rooms,\nclose deals",
			subtitle:
				"We handle the marketing. You only need to show the room on-site and manage the legal process.",
			body: "",
		},
		{
			title: "Your listings,\nyour control",
			subtitle:
				"Upload properties in minutes, track viewers, manage notes, and mark sold — all from your phone.",
			body: "",
		},
	];

	const nextStep = () => {
		if (step < steps.length) {
			setStep(step + 1);
		} else {
			router.push("/profile/login"); // finish onboarding
		}
	};

	const skip = () => {
		router.push("/profile/login"); // skip onboarding
	};

	const currentStep = steps[step - 1];
	const isLastStep = step === steps.length;

	return (
		<SafeAreaView
			style={{ flex: 1, padding: 16, justifyContent: "space-between" }}
		>
			{/* Header */}
			<View>
				{/* Step content */}
				<Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
					{currentStep.title}
				</Text>
				<Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
					{currentStep.subtitle}
				</Text>
				{currentStep.body ? (
					<Text style={{ color: "#666", fontSize: 12 }}>
						{currentStep.body}
					</Text>
				) : null}
			</View>

			{/* Step indicator */}
			<View style={styles.stepIndicatorContainer}>
				{steps.map((_, index) => (
					<View
						key={index}
						style={[
							styles.stepDot,
							index < step ? styles.stepDotActive : styles.stepDotInactive,
						]}
					/>
				))}
			</View>

			{/* Footer buttons */}
			<View style={{ marginTop: 24, alignItems: "center" }}>
				{!isLastStep ? (
					<>
						{/* Next button */}
						<TouchableOpacity onPress={nextStep} style={styles.nextButton}>
							<Text style={{ color: "#fff", fontWeight: "600" }}>Next</Text>
						</TouchableOpacity>

						{/* Skip button */}
						<TouchableOpacity onPress={skip} style={{ marginTop: 12 }}>
							<Text style={{ color: "#666", fontWeight: "500" }}>Skip</Text>
						</TouchableOpacity>
					</>
				) : (
					<TouchableOpacity onPress={nextStep} style={styles.nextButton}>
						<Text style={{ color: "#fff", fontWeight: "600" }}>
							Get Started
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	stepIndicatorContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 24,
	},
	stepDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginHorizontal: 6,
	},
	stepDotActive: {
		backgroundColor: "#000",
	},
	stepDotInactive: {
		backgroundColor: "#eee",
	},
	nextButton: {
		backgroundColor: "#000",
		paddingVertical: 10,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
});
