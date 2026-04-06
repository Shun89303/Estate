import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import PhoneInput from "react-native-phone-number-input";

export default function LoginProcess() {
	const router = useRouter();
	const [step, setStep] = useState(1);

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

	const steps = 3;
	const progress = step / steps;

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

		if (step < steps) {
			setStep(step + 1);
		} else {
			// Submit final data
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

	const toggleLanguage = (lang: string) => {
		if (languages.includes(lang)) {
			setLanguages(languages.filter((l) => l !== lang));
		} else {
			setLanguages([...languages, lang]);
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

	return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
			>
				{/* Header */}
				<View>
					{/* Step indicator */}
					<Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
						Step {step} of {steps}
					</Text>
					<View style={styles.stepBarContainer}>
						<View style={[styles.stepBarProgress, { flex: progress }]} />
						<View style={[styles.stepBarRemaining, { flex: 1 - progress }]} />
					</View>

					{/* Step content */}
					{step === 1 && (
						<>
							<Text
								style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}
							>
								What’s your name?
							</Text>
							<Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
								This will be shown to clients
							</Text>

							{/* Image picker */}
							<TouchableOpacity
								onPress={pickImage}
								style={{
									width: 100,
									height: 100,
									borderRadius: 50,
									backgroundColor: "#eee",
									justifyContent: "center",
									alignItems: "center",
									marginBottom: 8,
								}}
							>
								{photoUri ? (
									<Image
										source={{ uri: photoUri }}
										style={{ width: 100, height: 100, borderRadius: 50 }}
									/>
								) : (
									<Text style={{ color: "#666", textAlign: "center" }}>
										Tap to upload photo
									</Text>
								)}
							</TouchableOpacity>

							<Text style={{ fontWeight: "500", marginTop: 16 }}>
								Full Name
							</Text>
							<TextInput
								placeholder="Your full name"
								value={name}
								onChangeText={setName}
								style={{
									borderWidth: 1,
									borderColor: "#ccc",
									borderRadius: 8,
									paddingHorizontal: 12,
									paddingVertical: 8,
									marginTop: 8,
								}}
							/>
						</>
					)}

					{step === 2 && (
						<>
							<Text
								style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}
							>
								Your phone number
							</Text>
							<Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
								So clients can reach you
							</Text>

							<PhoneInput
								ref={phoneInputRef}
								defaultValue={phone}
								defaultCode="MM"
								layout="first"
								onChangeFormattedText={setPhone}
								containerStyle={{
									width: "100%",
									borderRadius: 8,
									borderWidth: 1,
									borderColor: "#ccc",
									marginTop: 8,
								}}
								textContainerStyle={{ paddingVertical: 0, borderRadius: 8 }}
								countryPickerProps={{ renderFlagButton: undefined }}
							/>
						</>
					)}

					{step === 3 && (
						<>
							<Text
								style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}
							>
								About you
							</Text>
							<Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
								Help clients know your expertise
							</Text>

							{/* Experience */}
							<Text style={{ fontWeight: "500", marginBottom: 8 }}>
								Experience
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 16,
								}}
							>
								{experienceOptions.map((exp) => (
									<TouchableOpacity
										key={exp}
										onPress={() => setExperience(exp)}
										style={{
											paddingVertical: 8,
											paddingHorizontal: 12,
											borderRadius: 8,
											borderWidth: 1,
											borderColor: experience === exp ? "#000" : "#ccc",
											backgroundColor: experience === exp ? "#000" : "#fff",
											marginRight: 8,
											marginBottom: 8,
										}}
									>
										<Text
											style={{ color: experience === exp ? "#fff" : "#000" }}
										>
											{exp}
										</Text>
									</TouchableOpacity>
								))}
							</View>

							{/* Languages */}
							<Text style={{ fontWeight: "500", marginBottom: 8 }}>
								Languages
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 16,
								}}
							>
								{languageOptions.map((lang) => {
									const selected = languages.includes(lang);
									return (
										<TouchableOpacity
											key={lang}
											onPress={() => toggleLanguage(lang)}
											style={{
												paddingVertical: 8,
												paddingHorizontal: 12,
												borderRadius: 8,
												borderWidth: 1,
												borderColor: selected ? "#000" : "#ccc",
												backgroundColor: selected ? "#000" : "#fff",
												marginRight: 8,
												marginBottom: 8,
											}}
										>
											<Text style={{ color: selected ? "#fff" : "#000" }}>
												{lang}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>

							{/* Short Bio */}
							<Text style={{ fontWeight: "500", marginBottom: 8 }}>
								Short Bio (optional)
							</Text>
							<TextInput
								placeholder="Tell clients about yourself…"
								value={bio}
								onChangeText={setBio}
								multiline
								numberOfLines={5}
								style={{
									borderWidth: 1,
									borderColor: "#ccc",
									borderRadius: 8,
									padding: 12,
									textAlignVertical: "top",
									marginBottom: 16,
								}}
							/>
						</>
					)}
				</View>

				{/* Footer buttons */}
				<View>
					<TouchableOpacity
						onPress={nextStep}
						disabled={
							(step === 1 && !name.trim()) ||
							(step === 2 && !phone.trim()) ||
							(step === 3 && (!experience || languages.length === 0))
						}
						style={{
							backgroundColor:
								(step === 1 && !name.trim()) ||
								(step === 2 && !phone.trim()) ||
								(step === 3 && (!experience || languages.length === 0))
									? "#ccc"
									: "#000",
							paddingVertical: 12,
							borderRadius: 8,
							alignItems: "center",
							marginBottom: step >= 2 ? 12 : 0,
						}}
					>
						<Text style={{ color: "#fff", fontWeight: "600" }}>
							{step === 3 ? "Submit for Approval" : "Continue"}
						</Text>
					</TouchableOpacity>

					{/* Back button only for step 2 and onward */}
					{step >= 2 && (
						<TouchableOpacity
							onPress={backStep}
							style={{ alignItems: "center" }}
						>
							<Text style={{ color: "#666", fontWeight: "500" }}>Back</Text>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	stepBarContainer: {
		flexDirection: "row",
		height: 8,
		borderRadius: 4,
		backgroundColor: "#eee",
		marginBottom: 24,
		overflow: "hidden",
	},
	stepBarProgress: {
		backgroundColor: "#000",
	},
	stepBarRemaining: {
		backgroundColor: "transparent",
	},
});
