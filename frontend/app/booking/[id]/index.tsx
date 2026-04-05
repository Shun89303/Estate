import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
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
import { Agent, Property } from "@/stores/usePropertyStore";
import { MOCK_PROPERTIES } from "@/mock/properties";
import { formatPrice } from "@/utils/formatPrice";
import { MOCK_AGENTS } from "@/mock/agents";
import ModalDateTimePicker from "react-native-modal-datetime-picker";

export default function Booking() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const [agent, setAgent] = useState<Agent | null>(null);
	const [question, setQuestion] = useState("");
	const [timeOption, setTimeOption] = useState<"now" | "schedule" | null>(null);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [platform, setPlatform] = useState<"phone" | "zoom" | null>(null);
	const [telegram, setTelegram] = useState("");
	const [viber, setViber] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_PROPERTIES.find(
			(p) => p.id?.toString() === id.toString(),
		);
		setProperty(found || null);
		setAgent(MOCK_AGENTS[0]);
	}, [id]);

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

	const coverMedia = property?.media?.find((m) => m.type === "cover");

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
					{/* Header */}
					<View style={styles.header}>
						<TouchableOpacity
							onPress={() => {
								if (step > 1) {
									setStep(step - 1);
								} else {
									router.back();
								}
							}}
						>
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
										source={{ uri: coverMedia?.url }} // mock image
										style={styles.propertyImage}
									/>
								</View>
								<View style={styles.propertyInfo}>
									<Text style={styles.propertyName}>{property?.name}</Text>
									<Text style={styles.propertyLocation}>
										{property?.location_text}
									</Text>
									<Text style={styles.propertyDetails}>
										{property?.bedrooms} 🛏 · {property?.bathrooms} 🛁 · ฿
										{formatPrice(property?.price)}
									</Text>
								</View>
							</View>

							{/* Agent Container */}
							<View style={styles.agentContainer}>
								<Image
									source={{ uri: agent?.profile_image }} // mock agent image
									style={styles.agentImage}
								/>
								<View style={styles.agentInfo}>
									<Text style={styles.agentName}>{agent?.name}</Text>
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
					{step === 3 && (
						<View style={styles.stepContainer}>
							{/* Step 3 Title */}
							<Text style={styles.stepTitle}>Your Question</Text>
							<Text style={styles.stepSubtitle}>
								Optional – tell the agent what you’d like to know
							</Text>

							{/* Huge text input */}
							<TextInput
								style={styles.textArea}
								placeholder="e.g. Is the price negotiable? Is it near BTS?…"
								multiline
								numberOfLines={6}
								textAlignVertical="top"
								value={question}
								onChangeText={setQuestion}
							/>

							{/* Continue Button */}
							<TouchableOpacity
								style={styles.continueButton}
								onPress={() => setStep(step + 1)}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}
					{step === 4 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Preferred Time</Text>

							{/* Row of two boxes */}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<TouchableOpacity
									style={[
										styles.timeBox,
										timeOption === "now" && styles.timeBoxSelected,
										{ flex: 1, marginRight: 8 },
									]}
									onPress={() => {
										setTimeOption("now");
										setSelectedDate(null);
										setSelectedTime(null);
									}}
								>
									<Text style={styles.timeBoxTitle}>Right now</Text>
									<Text style={styles.timeBoxSubtitle}>Start immediately</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[
										styles.timeBox,
										timeOption === "schedule" && styles.timeBoxSelected,
										{ flex: 1, marginLeft: 8 },
									]}
									onPress={() => setTimeOption("schedule")}
								>
									<Text style={styles.timeBoxTitle}>Schedule</Text>
									<Text style={styles.timeBoxSubtitle}>Pick date & time</Text>
								</TouchableOpacity>
							</View>

							{/* Schedule options */}
							{timeOption === "schedule" && (
								<View style={{ marginTop: 12 }}>
									<TouchableOpacity
										style={styles.datePickerBox}
										onPress={() => setShowDatePicker(true)}
									>
										<Text style={styles.datePickerText}>
											{selectedDate
												? selectedDate.toLocaleDateString("en-US", {
														month: "long",
														day: "numeric",
														year: "numeric",
													})
												: "Pick a date"}
										</Text>
									</TouchableOpacity>

									{/* Time slots */}
									{selectedDate && (
										<View
											style={{
												flexDirection: "row",
												flexWrap: "wrap",
												justifyContent: "space-between",
											}}
										>
											{[
												"09:00",
												"10:00",
												"11:00",
												"13:00",
												"14:00",
												"15:00",
												"16:00",
												"17:00",
											].map((time) => (
												<TouchableOpacity
													key={time}
													style={[
														styles.timeSlotBox,
														selectedTime === time && styles.timeSlotSelected,
														{ width: "23%", marginBottom: 12 },
													]}
													onPress={() => setSelectedTime(time)}
												>
													<Text
														style={{
															color: selectedTime === time ? "#fff" : "#000",
															textAlign: "center",
															fontWeight: "500",
														}}
													>
														{time}
													</Text>
												</TouchableOpacity>
											))}
										</View>
									)}
								</View>
							)}

							{/* Continue button */}
							<TouchableOpacity
								style={[
									styles.continueButton,
									!(timeOption === "now" || (selectedDate && selectedTime)) && {
										opacity: 0.5,
									},
								]}
								disabled={
									!(timeOption === "now" || (selectedDate && selectedTime))
								}
								onPress={() => setStep(step + 1)}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>

							{/* Date picker modal */}
							<ModalDateTimePicker
								isVisible={showDatePicker}
								mode="date"
								onConfirm={(date) => {
									setSelectedDate(date);
									setShowDatePicker(false);
									setSelectedTime(null);
								}}
								onCancel={() => setShowDatePicker(false)}
							/>
						</View>
					)}
					{step === 5 && (
						<View style={styles.stepContainer}>
							{/* Step 5 Title */}
							<Text style={styles.stepTitle}>Consultation Fee</Text>

							{/* Fee Box */}
							<View style={styles.feeBox}>
								<Text style={styles.feeTitle}>Agent Consultation Fee</Text>
								<Text style={styles.feeAmount}>0 MMK</Text>
								<Text style={styles.feeSubtitle}>
									✦ Complimentary — Premium Promotion
								</Text>
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
					{step === 6 && (
						<View style={styles.stepContainer}>
							{/* Step 6 Title */}
							<Text style={styles.stepTitle}>Platform</Text>

							{/* Row of two platform options */}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									marginVertical: 12,
								}}
							>
								{/* Phone Call */}
								<TouchableOpacity
									style={[
										styles.platformBox,
										platform === "phone" && styles.platformBoxSelected,
										{ flex: 1, marginRight: 8 },
									]}
									onPress={() => setPlatform("phone")}
								>
									<Text style={styles.platformIcon}>📞</Text>
									<Text style={styles.platformText}>Phone Call</Text>
								</TouchableOpacity>

								{/* Zoom */}
								<TouchableOpacity
									style={[
										styles.platformBox,
										platform === "zoom" && styles.platformBoxSelected,
										{ flex: 1, marginLeft: 8 },
									]}
									onPress={() => setPlatform("zoom")}
								>
									<Text style={styles.platformIcon}>📹</Text>
									<Text style={styles.platformText}>Zoom</Text>
								</TouchableOpacity>
							</View>

							{/* Conditional rendering based on selection */}
							{platform === "phone" && (
								<View style={styles.altContactBox}>
									<Text style={styles.altContactTitle}>
										Optional – Alternative contact
									</Text>
									<TextInput
										style={styles.input}
										placeholder="Telegram ID (optional)"
										value={telegram}
										onChangeText={setTelegram}
									/>
									<TextInput
										style={styles.input}
										placeholder="Viber number (optional)"
										value={viber}
										onChangeText={setViber}
									/>
								</View>
							)}

							{platform === "zoom" && (
								<>
									<View style={styles.zoomInfoBox}>
										<Text style={styles.zoomInfoText}>
											📹 A private Zoom link will be sent to you before your
											session.
										</Text>
									</View>
									<View style={styles.altContactBox}>
										<Text style={styles.altContactTitle}>
											Optional – Alternative contact
										</Text>
										<TextInput
											style={styles.input}
											placeholder="Telegram ID (optional)"
											value={telegram}
											onChangeText={setTelegram}
										/>
										<TextInput
											style={styles.input}
											placeholder="Viber number (optional)"
											value={viber}
											onChangeText={setViber}
										/>
									</View>
								</>
							)}

							{/* Continue Button */}
							<TouchableOpacity
								style={styles.continueButton}
								onPress={() => setStep(step + 1)}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}
					{step === 7 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Confirmation</Text>

							{/* Info rows */}
							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Phone</Text>
								<Text style={styles.infoValue}>{phoneNumber}</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Property</Text>
								<Text style={styles.infoValue}>{property?.name}</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Agent</Text>
								<Text style={styles.infoValue}>{agent?.name}</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Time</Text>
								<Text style={styles.infoValue}>
									{timeOption === "now"
										? "Right now"
										: selectedDate && selectedTime
											? `${selectedDate.toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric",
												})} at ${selectedTime}`
											: "-"}
								</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Platform</Text>
								<Text style={styles.infoValue}>
									{platform === "phone"
										? "Phone Call"
										: platform === "zoom"
											? "Zoom"
											: "-"}
								</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Fee</Text>
								<Text style={styles.infoValue}>0 MMK</Text>
							</View>

							{/* Confirm button */}
							<TouchableOpacity
								style={[styles.continueButton, { marginTop: 20 }]}
								onPress={() => router.push("/success")}
							>
								<Text style={styles.continueText}>✦Confirm Appointment</Text>
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
	textArea: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		minHeight: 120,
	},
	timeBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
	},
	timeBoxSelected: {
		borderColor: "#000",
		backgroundColor: "#e6e6e6",
	},
	timeBoxTitle: { fontSize: 14, fontWeight: "600" },
	timeBoxSubtitle: { fontSize: 12, color: "#555", marginTop: 4 },
	datePickerBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
	},
	datePickerText: { fontSize: 14, color: "#000" },
	timeSlotBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingVertical: 10,
		marginBottom: 8,
	},
	timeSlotSelected: {
		backgroundColor: "#000",
		borderColor: "#000",
	},
	feeBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
	},
	feeTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
	feeAmount: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
	feeSubtitle: { fontSize: 12, color: "#555" },
	platformBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
	},
	platformBoxSelected: {
		borderColor: "#000",
		backgroundColor: "#e6e6e6",
	},
	platformIcon: { fontSize: 24, marginBottom: 8 },
	platformText: { fontSize: 14, fontWeight: "600" },

	altContactBox: { marginTop: 12 },
	altContactTitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },

	zoomInfoBox: {
		padding: 12,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		backgroundColor: "#f9f9f9",
		marginBottom: 12,
	},
	zoomInfoText: { fontSize: 14, color: "#000" },
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		marginBottom: 4,
	},
	infoLabel: {
		fontSize: 14,
		color: "#555",
	},
	infoValue: {
		fontSize: 14,
		fontWeight: "600",
		color: "#000",
	},
});
