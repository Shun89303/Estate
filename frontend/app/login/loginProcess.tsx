// app/profile/loginProcess.tsx
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ExpoImagePicker from "expo-image-picker";
import PhoneInput from "react-native-phone-number-input";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import StepProgressBar from "@/components/common/utils/StepProgressBar";
import NextButton from "@/components/common/navigation/NextButton";
import SkipButton from "@/components/common/navigation/SkipButton";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { ImagePicker } from "@/components/common/utils/ImagePicker";
import { PhoneNumberInput } from "@/components/common/dataEntry/PhoneNumberInput";
import { ChipSelector } from "@/components/common/dataEntry/ChipSelector";
import { TextArea } from "@/components/common/dataEntry/TextArea";
import { SimpleTextInput } from "@/components/common/dataEntry/SimpleTextInput";

export default function LoginProcess() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const totalSteps = 3;

	// Step 1 states
	const [name, setName] = useState("");
	const [photoUri, setPhotoUri] = useState<string | null>(null);

	// Step 2 state
	const [phone, setPhone] = useState("");
	const phoneInputRef = useRef<PhoneInput>(null);

	// Step 3 states
	const [experience, setExperience] = useState<string | null>(null);
	const [languages, setLanguages] = useState<string[]>([]);
	const [bio, setBio] = useState("");

	const pickImage = async () => {
		const result = await ExpoImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
		});
		if (!result.canceled) {
			setPhotoUri(result.assets[0].uri);
		}
	};

	const nextStep = () => {
		if (step === 1 && !name.trim()) return;
		if (step === 2 && !phone.trim()) return;
		if (step === 3 && (!experience || languages.length === 0)) return;
		if (step < totalSteps) {
			setStep(step + 1);
		} else {
			router.push("/approval");
		}
	};

	const backStep = () => {
		if (step > 1) {
			setStep(step - 1);
		} else {
			router.back();
		}
	};

	const experienceOptions = [
		"< 1 year",
		"1-3 years",
		"3-5 years",
		"5-10 years",
		"10+ years",
	];
	const languageOptions = [
		"Thai",
		"English",
		"Myanmar",
		"Chinese",
		"Japanese",
		"Korean",
	];

	const isStep1Valid = name.trim() !== "";
	const isStep2Valid = phone.trim() !== "";
	const isStep3Valid = experience !== null && languages.length > 0;

	const buttonTitle = step === 3 ? "Submit for Approval" : "Continue →";

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View>
					<StepProgressBar currentStep={step} totalSteps={totalSteps} />
					<BodyText variant="small" style={styles.stepText}>
						Step {step} of {totalSteps}
					</BodyText>

					{step === 1 && (
						<>
							<Title variant="page" style={styles.stepTitle}>
								What&apos;s your name?
							</Title>
							<BodyText variant="large" style={styles.stepSubtitle}>
								This will be shown to clients
							</BodyText>

							<ImagePicker
								imageUri={photoUri}
								onPress={pickImage}
								backgroundColor={lightColors.mutedBackground}
								iconColor={lightColors.bodyText}
								dashedBorder
								size={100}
								borderRadius={25}
								iconSize={40}
							/>
							<BodyText variant="normal" style={styles.uploadText}>
								Tap to upload photo
							</BodyText>

							<Title variant="small" style={styles.inputLabel}>
								Full Name
							</Title>
							<SimpleTextInput
								placeholder="Your full name"
								value={name}
								onChangeText={setName}
							/>
						</>
					)}

					{step === 2 && (
						<>
							<Title variant="page" style={styles.stepTitle}>
								Your phone number
							</Title>
							<BodyText variant="large" style={styles.stepSubtitle}>
								So clients can reach you
							</BodyText>

							<PhoneNumberInput
								ref={phoneInputRef}
								defaultCountry="TH"
								value={phone}
								onChangePhoneNumber={setPhone}
								layout="second"
								containerStyle={styles.phoneContainer}
								textContainerStyle={styles.phoneTextContainer}
							/>
						</>
					)}

					{step === 3 && (
						<>
							<Title variant="page" style={styles.stepTitle}>
								About you
							</Title>
							<BodyText variant="large" style={styles.stepSubtitle}>
								Help clients know your expertise
							</BodyText>

							{/* Experience (single select) */}
							<Title variant="small" style={styles.inputLabel}>
								Experience
							</Title>
							<ChipSelector
								options={experienceOptions}
								selected={experience}
								onSelect={(value) => setExperience(value as string)}
								mode="single"
							/>

							{/* Languages (multiple select) */}
							<Title variant="small" style={styles.inputLabel}>
								Languages
							</Title>
							<ChipSelector
								options={languageOptions}
								selected={languages}
								onSelect={(value) => setLanguages(value as string[])}
								mode="multiple"
							/>

							<Title variant="small" style={styles.inputLabel}>
								Short Bio (optional)
							</Title>
							<TextArea
								placeholder="Tell clients about yourself…"
								value={bio}
								onChangeText={setBio}
								numberOfLines={5}
							/>
						</>
					)}
				</View>

				<View style={styles.footer}>
					<NextButton
						onPress={nextStep}
						title={buttonTitle}
						disabled={
							(step === 1 && !isStep1Valid) ||
							(step === 2 && !isStep2Valid) ||
							(step === 3 && !isStep3Valid)
						}
					/>
					{step >= 2 && <SkipButton onPress={backStep} title="Back" />}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "space-between",
		padding: spacing.lg,
	},
	stepText: {
		marginBottom: spacing.md,
	},
	stepTitle: {
		marginBottom: spacing.sm,
	},
	stepSubtitle: {
		marginBottom: spacing.xl,
	},
	uploadText: {
		textAlign: "center",
		color: lightColors.bodyText,
		marginTop: spacing.lg,
		marginBottom: spacing.md,
	},
	inputLabel: {
		marginTop: spacing.md,
		marginBottom: spacing.xs,
	},
	input: {
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(8),
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		fontSize: moderateScale(14),
		backgroundColor: "#fff",
	},
	phoneContainer: {
		width: "100%",
		borderRadius: scaleSize(8),
		marginTop: spacing.md,
		backgroundColor: lightColors.entireAppBackground,
	},
	phoneTextContainer: {
		paddingVertical: 0,
		borderRadius: scaleSize(8),
	},
	optionsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: spacing.md,
		alignItems: "center",
	},
	optionChip: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: scaleSize(10),
		marginRight: spacing.sm,
		marginBottom: spacing.sm,
		backgroundColor: "#fff",
	},
	optionChipSelected: {
		backgroundColor: lightColors.brand,
		borderColor: lightColors.brand,
	},
	optionText: {
		color: lightColors.bigTitleText,
		marginBottom: 0,
	},
	optionTextSelected: {
		color: "#fff",
	},
	textArea: {
		borderWidth: scaleSize(1),
		borderRadius: scaleSize(8),
		padding: spacing.md,
		textAlignVertical: "top", // Ensures cursor starts at top
		marginBottom: spacing.md,
		backgroundColor: lightColors.entireAppBackground,
		fontSize: moderateScale(14),
		minHeight: scaleSize(120), // Makes it "huge" (adjust as needed)
		// Optional: allow it to grow with content (remove if fixed height preferred)
		// height: scaleSize(120),      // Fixed height – uncomment if you want exact size
	},
	footer: {
		marginTop: spacing.xl,
	},
});
