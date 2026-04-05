import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-number-input";

export default function Booking() {
	const router = useRouter();

	// Step management
	const [step, setStep] = useState(1);

	// User inputs
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	const phoneInputRef = useRef<PhoneInput>(null);

	const handleContinue = () => {
		// Simple validation
		const isValid = phoneInputRef.current?.isValidNumber(phoneNumber);

		if (!isValid) {
			Alert.alert("Invalid phone number");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Password must be at least 6 characters");
			return;
		}

		// For now, just go to step 2
		setStep(step + 1);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
					{/* Header */}
					<View style={styles.header}>
						<TouchableOpacity onPress={() => router.back()}>
							<Text style={styles.backText}>Back</Text>
						</TouchableOpacity>
						<Text style={styles.title}>Book Consultation</Text>
					</View>

					{/* Step indicator */}
					<Text style={styles.stepIndicator}>Step {step} of 7</Text>

					{/* Step content */}
					{step === 1 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Create Account</Text>
							<Text style={styles.stepSubtitle}>
								Enter your phone number and set a password
							</Text>

							{/* Phone number input */}
							<PhoneInput
								ref={phoneInputRef}
								defaultValue={phoneNumber}
								defaultCode="MM" // Myanmar
								layout="first"
								onChangeFormattedText={setPhoneNumber}
								containerStyle={styles.phoneContainer}
								textContainerStyle={styles.phoneTextContainer}
								countryPickerProps={{ renderFlagButton: undefined }}
							/>

							{/* Password input */}
							<TextInput
								style={styles.input}
								placeholder="Password"
								secureTextEntry
								value={password}
								onChangeText={setPassword}
							/>

							{/* Continue button */}
							<TouchableOpacity
								style={styles.continueButton}
								onPress={handleContinue}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}

					{step === 2 && (
						<View style={styles.stepContainer}>
							{/* Step 2 Title */}
							<Text style={styles.stepTitle}>Property Selected</Text>

							{/* Property Card */}
							<View style={styles.propertyCard}>
								<View style={styles.propertyImageContainer}>
									<Image
										source={{ uri: "https://via.placeholder.com/100" }} // mock image
										style={styles.propertyImage}
									/>
								</View>
								<View style={styles.propertyInfo}>
									<Text style={styles.propertyName}>Sunny Apartment</Text>
									<Text style={styles.propertyLocation}>Yangon, Myanmar</Text>
									<Text style={styles.propertyDetails}>
										2 🛏 · 1 🛁 · ฿250,000
									</Text>
								</View>
							</View>

							{/* Agent Container */}
							<View style={styles.agentContainer}>
								<Image
									source={{ uri: "https://via.placeholder.com/50" }} // mock agent image
									style={styles.agentImage}
								/>
								<View style={styles.agentInfo}>
									<Text style={styles.agentName}>John Doe</Text>
									<Text style={styles.agentSubtitle}>Your Property Agent</Text>
								</View>
							</View>

							{/* Continue Button */}
							<TouchableOpacity
								style={styles.continueButton}
								onPress={() => setStep(step + 1)}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	backText: { fontSize: 14, color: "#007bff" },
	title: { fontSize: 18, fontWeight: "600" },
	stepIndicator: { fontSize: 12, color: "#666", marginBottom: 12 },
	stepContainer: { marginTop: 16 },
	stepTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
	stepSubtitle: { fontSize: 12, color: "#555", marginBottom: 16 },
	phoneContainer: { width: "100%", height: 50, marginBottom: 12 },
	phoneTextContainer: { paddingVertical: 0 },
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	continueButton: {
		backgroundColor: "#000",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
	},
	continueText: { color: "#fff", fontWeight: "600" },
	propertyCard: {
		flexDirection: "row",
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		alignItems: "center",
	},
	propertyImageContainer: {
		width: 100,
		height: 100,
		borderRadius: 8,
		overflow: "hidden",
	},
	propertyImage: { width: 100, height: 100, borderRadius: 8 },
	propertyInfo: { flex: 1, marginLeft: 12 },
	propertyName: { fontSize: 14, fontWeight: "600" },
	propertyLocation: { fontSize: 12, color: "#555", marginVertical: 2 },
	propertyDetails: { fontSize: 12, color: "#666" },

	agentContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
		marginBottom: 16,
	},
	agentImage: { width: 50, height: 50, borderRadius: 25 },
	agentInfo: { marginLeft: 12 },
	agentName: { fontSize: 14, fontWeight: "600" },
	agentSubtitle: { fontSize: 12, color: "#555" },
});
