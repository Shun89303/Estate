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

// ---------- Separate Calendar Component ----------
const InlineCalendar = ({
	selectedDate,
	onSelectDate,
}: {
	selectedDate: Date | null;
	onSelectDate: (date: Date) => void;
}) => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const daysArray = [];
	for (let i = 0; i < firstDayOfMonth; i++) {
		daysArray.push(null);
	}
	for (let i = 1; i <= daysInMonth; i++) {
		daysArray.push(new Date(currentYear, currentMonth, i));
	}

	const changeMonth = (delta: number) => {
		let newMonth = currentMonth + delta;
		let newYear = currentYear;
		if (newMonth < 0) {
			newMonth = 11;
			newYear--;
		} else if (newMonth > 11) {
			newMonth = 0;
			newYear++;
		}
		setCurrentMonth(newMonth);
		setCurrentYear(newYear);
	};

	const isSelectedDate = (date: Date) => {
		return selectedDate && date.toDateString() === selectedDate.toDateString();
	};

	return (
		<View style={styles.calendarContainer}>
			<View style={styles.calendarHeader}>
				<TouchableOpacity onPress={() => changeMonth(-1)}>
					<Text style={styles.calendarNav}>◀</Text>
				</TouchableOpacity>
				<Text style={styles.calendarMonth}>
					{new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
						month: "long",
						year: "numeric",
					})}
				</Text>
				<TouchableOpacity onPress={() => changeMonth(1)}>
					<Text style={styles.calendarNav}>▶</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.calendarWeekDays}>
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<Text key={day} style={styles.weekDay}>
						{day}
					</Text>
				))}
			</View>
			<View style={styles.calendarDays}>
				{daysArray.map((date, idx) => (
					<TouchableOpacity
						key={idx}
						style={[
							styles.calendarDay,
							date && isSelectedDate(date) && styles.selectedCalendarDay,
						]}
						onPress={() => {
							if (date) onSelectDate(date);
						}}
						disabled={!date}
					>
						<Text
							style={[
								styles.calendarDayText,
								date && isSelectedDate(date) && styles.selectedCalendarDayText,
							]}
						>
							{date ? date.getDate() : ""}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

// ---------- Main Component ----------
export default function Booking() {
	const router = useRouter();

	// Step management
	const [step, setStep] = useState(1);

	// User inputs
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [question, setQuestion] = useState("");

	// Step 4 states
	const [selectedOption, setSelectedOption] = useState<
		"now" | "schedule" | null
	>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [showCalendar, setShowCalendar] = useState(false);

	const phoneInputRef = useRef<PhoneInput>(null);

	// Helper to format date as "April 16th, 2026"
	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	// Time slots
	const timeSlots = [
		"09:00",
		"10:00",
		"11:00",
		"13:00",
		"14:00",
		"15:00",
		"16:00",
		"17:00",
	];

	// Check if continue button should be enabled for step 4
	const isStep4Valid = () => {
		if (selectedOption === "now") return true;
		if (selectedOption === "schedule" && selectedDate && selectedTime)
			return true;
		return false;
	};

	const handleContinue = () => {
		if (step === 1) {
			const isValid = phoneInputRef.current?.isValidNumber(phoneNumber);
			if (!isValid) {
				Alert.alert("Invalid phone number");
				return;
			}
			if (password.length < 6) {
				Alert.alert("Password must be at least 6 characters");
				return;
			}
		}
		if (step === 4 && !isStep4Valid()) {
			Alert.alert("Please select a preferred time");
			return;
		}
		setStep(step + 1);
	};

	// Step 6 – Platform
	const [platform, setPlatform] = useState<"phone" | "zoom" | null>(null);
	const [telegram, setTelegram] = useState("");
	const [viber, setViber] = useState("");

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
									setStep(step - 1); // Go to previous step
								} else {
									router.back(); // Step 1, go back to previous screen
								}
							}}
						>
							<Text style={styles.backText}>Back</Text>
						</TouchableOpacity>
						<Text style={styles.title}>Book Consultation</Text>
					</View>

					{/* Step indicator */}
					<Text style={styles.stepIndicator}>Step {step} of 7</Text>

					{/* Step 1 */}
					{step === 1 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Create Account</Text>
							<Text style={styles.stepSubtitle}>
								Enter your phone number and set a password
							</Text>

							<PhoneInput
								ref={phoneInputRef}
								defaultValue={phoneNumber}
								defaultCode="MM"
								layout="first"
								onChangeFormattedText={setPhoneNumber}
								containerStyle={styles.phoneContainer}
								textContainerStyle={styles.phoneTextContainer}
							/>

							<TextInput
								style={styles.input}
								placeholder="Password"
								secureTextEntry
								value={password}
								onChangeText={setPassword}
							/>

							<TouchableOpacity
								style={styles.continueButton}
								onPress={handleContinue}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}

					{/* Step 2 */}
					{step === 2 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Property Selected</Text>

							<View style={styles.propertyCard}>
								<View style={styles.propertyImageContainer}>
									<Image
										source={{ uri: "https://via.placeholder.com/100" }}
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

							<View style={styles.agentContainer}>
								<Image
									source={{ uri: "https://via.placeholder.com/50" }}
									style={styles.agentImage}
								/>
								<View style={styles.agentInfo}>
									<Text style={styles.agentName}>John Doe</Text>
									<Text style={styles.agentSubtitle}>Your Property Agent</Text>
								</View>
							</View>

							<TouchableOpacity
								style={styles.continueButton}
								onPress={handleContinue}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}

					{/* Step 3 */}
					{step === 3 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Your Question</Text>
							<Text style={styles.stepSubtitle}>
								Optional – tell the agent what you&apos;d like to know
							</Text>

							<TextInput
								style={styles.textArea}
								placeholder="e.g. Is the price negotiable? Is it near BTS?…"
								multiline
								numberOfLines={6}
								textAlignVertical="top"
								value={question}
								onChangeText={setQuestion}
							/>

							<TouchableOpacity
								style={styles.continueButton}
								onPress={handleContinue}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}

					{/* STEP 4 – Preferred Time */}
					{step === 4 && (
						<View style={styles.stepContainer}>
							<Text style={styles.stepTitle}>Preferred Time</Text>
							<View style={styles.optionRow}>
								{/* Right now box */}
								<TouchableOpacity
									style={[
										styles.optionBox,
										selectedOption === "now" && styles.selectedOptionBox,
									]}
									onPress={() => {
										setSelectedOption("now");
										setSelectedDate(null);
										setSelectedTime(null);
										setShowCalendar(false);
									}}
								>
									<Text style={styles.optionTitle}>Right now</Text>
									<Text style={styles.optionSubtitle}>Start immediately</Text>
								</TouchableOpacity>

								{/* Schedule box */}
								<TouchableOpacity
									style={[
										styles.optionBox,
										selectedOption === "schedule" && styles.selectedOptionBox,
									]}
									onPress={() => {
										setSelectedOption("schedule");
										setSelectedTime(null);
										// keep existing date if any, but reset time
									}}
								>
									<Text style={styles.optionTitle}>Schedule</Text>
									<Text style={styles.optionSubtitle}>Pick date & time</Text>
								</TouchableOpacity>
							</View>

							{/* Schedule details */}
							{selectedOption === "schedule" && (
								<View style={styles.scheduleContainer}>
									{/* Date picker trigger */}
									<TouchableOpacity
										style={styles.datePickerButton}
										onPress={() => setShowCalendar(!showCalendar)}
									>
										<Text style={styles.datePickerText}>
											{selectedDate ? formatDate(selectedDate) : "Pick a date"}
										</Text>
									</TouchableOpacity>

									{/* Calendar - now conditionally rendered */}
									{showCalendar && (
										<InlineCalendar
											selectedDate={selectedDate}
											onSelectDate={(date) => {
												setSelectedDate(date);
												setShowCalendar(false); // close calendar after selection
											}}
										/>
									)}

									{/* Time slots - only show if date is selected */}
									{selectedDate && (
										<View style={styles.timeSlotsContainer}>
											<View style={styles.timeGrid}>
												{timeSlots.map((time) => (
													<TouchableOpacity
														key={time}
														style={[
															styles.timeSlot,
															selectedTime === time && styles.selectedTimeSlot,
														]}
														onPress={() => setSelectedTime(time)}
													>
														<Text
															style={[
																styles.timeSlotText,
																selectedTime === time &&
																	styles.selectedTimeSlotText,
															]}
														>
															{time}
														</Text>
													</TouchableOpacity>
												))}
											</View>
										</View>
									)}
								</View>
							)}

							{/* Continue button with dynamic enabling */}
							<TouchableOpacity
								style={[
									styles.continueButton,
									!isStep4Valid() && styles.disabledButton,
								]}
								onPress={handleContinue}
								disabled={!isStep4Valid()}
							>
								<Text style={styles.continueText}>Continue</Text>
							</TouchableOpacity>
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
								<Text style={styles.infoValue}>
									Luxury Condo at Sukhumvit 24
								</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Agent</Text>
								<Text style={styles.infoValue}>Aye Thandar</Text>
							</View>

							<View style={styles.infoRow}>
								<Text style={styles.infoLabel}>Time</Text>
								<Text style={styles.infoValue}>
									{selectedOption === "now"
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
								onPress={() => router.replace("/success")}
							>
								<Text style={styles.continueText}>Confirm Appointment</Text>
							</TouchableOpacity>
						</View>
					)}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

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
	disabledButton: {
		backgroundColor: "#ccc",
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
		minHeight: 120,
		textAlignVertical: "top",
		marginBottom: 16,
		fontSize: 14,
	},
	// Step 4 styles
	optionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	optionBox: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 6,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	selectedOptionBox: {
		borderColor: "#000",
		backgroundColor: "#e8e8e8",
	},
	optionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	optionSubtitle: {
		fontSize: 12,
		color: "#666",
	},
	scheduleContainer: {
		marginTop: 8,
		marginBottom: 16,
	},
	datePickerButton: {
		backgroundColor: "#f0f0f0",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 12,
	},
	datePickerText: {
		fontSize: 16,
		color: "#333",
	},
	calendarContainer: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	calendarHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	calendarNav: {
		fontSize: 20,
		paddingHorizontal: 12,
	},
	calendarMonth: {
		fontSize: 16,
		fontWeight: "600",
	},
	calendarWeekDays: {
		flexDirection: "row",
		marginBottom: 8,
	},
	weekDay: {
		flex: 1,
		textAlign: "center",
		fontWeight: "500",
		color: "#666",
		fontSize: 12,
	},
	calendarDays: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	calendarDay: {
		width: "14.28%",
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	selectedCalendarDay: {
		backgroundColor: "#000",
		borderRadius: 20,
	},
	calendarDayText: {
		fontSize: 14,
		color: "#333",
	},
	selectedCalendarDayText: {
		color: "#fff",
	},
	timeSlotsContainer: {
		marginTop: 8,
	},
	timeGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	timeSlot: {
		width: "23%",
		backgroundColor: "#f5f5f5",
		paddingVertical: 12,
		marginBottom: 8,
		borderRadius: 8,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	selectedTimeSlot: {
		backgroundColor: "#000",
		borderColor: "#000",
	},
	timeSlotText: {
		fontSize: 14,
		color: "#333",
	},
	selectedTimeSlotText: {
		color: "#fff",
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
