import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Image,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/navigation/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import StepProgressBar from "@/components/common/utils/StepProgressBar";
import {
	CalendarDays,
	Eye,
	EyeOff,
	MapPin,
	MessageCircle,
	Phone,
	VideoIcon,
	Zap,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";
import { formatPrice } from "@/utils/formatPrice";

// ---------- Separate Calendar Component ----------
const InlineCalendar = ({
	selectedDate,
	onSelectDate,
}: {
	selectedDate: Date | null;
	onSelectDate: (date: Date | null) => void;
}) => {
	const colors = useTheme();
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const daysArray = [];
	for (let i = 0; i < firstDayOfMonth; i++) daysArray.push(null);
	for (let i = 1; i <= daysInMonth; i++)
		daysArray.push(new Date(currentYear, currentMonth, i));

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

	const isSelectedDate = (date: Date) =>
		selectedDate && date.toDateString() === selectedDate.toDateString();

	return (
		<View
			style={[styles.calendarContainer, { backgroundColor: colors.surface }]}
		>
			<View style={styles.calendarHeader}>
				<TouchableOpacity onPress={() => changeMonth(-1)}>
					<BodyText style={styles.calendarNav}>◀</BodyText>
				</TouchableOpacity>
				<NormalTitle style={styles.calendarMonth}>
					{new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
						month: "long",
						year: "numeric",
					})}
				</NormalTitle>
				<TouchableOpacity onPress={() => changeMonth(1)}>
					<BodyText style={styles.calendarNav}>▶</BodyText>
				</TouchableOpacity>
			</View>
			<View style={styles.calendarWeekDays}>
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<BodyText key={day} style={styles.weekDay}>
						{day}
					</BodyText>
				))}
			</View>
			<View style={styles.calendarDays}>
				{daysArray.map((date, idx) => (
					<TouchableOpacity
						key={idx}
						style={[styles.calendarDay]}
						onPress={() => {
							if (date) {
								if (isSelectedDate(date)) {
									onSelectDate(null);
								} else {
									onSelectDate(date);
								}
							}
						}}
						disabled={!date}
					>
						<BodyText
							style={[
								styles.calendarDayText,
								date && isSelectedDate(date)
									? { color: colors.primaryGold, fontWeight: "700" }
									: {},
							]}
						>
							{date ? date.getDate() : ""}
						</BodyText>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

// ---------- Main Component ----------
export default function Booking() {
	const router = useRouter();
	const colors = useTheme();
	const params = useLocalSearchParams();
	const propertyImage = params.image as string;
	const propertyTitle = params.title as string;
	const propertyLocation = params.location as string;
	const propertyPrice = params.price as string;
	const isAgent = params.isAgent === "1"; // "1" -> true, otherwise false
	const agentName = params.agentName as string;
	const agentImage = params.agentImage as string;

	const [step, setStep] = useState(1);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [question, setQuestion] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [selectedOption, setSelectedOption] = useState<
		"now" | "schedule" | null
	>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [showCalendar, setShowCalendar] = useState(false);
	const [platform, setPlatform] = useState<"phone" | "zoom" | null>(null);
	const [telegram, setTelegram] = useState("");
	const [viber, setViber] = useState("");

	const phoneInputRef = useRef<PhoneInput>(null);

	const formatDate = (date: Date) =>
		date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

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

	const isStep4Valid = () => {
		if (selectedOption === "now") return true;
		if (selectedOption === "schedule" && selectedDate && selectedTime)
			return true;
		return false;
	};

	const isCurrentStepValid = () => {
		if (step === 1) {
			const isValid =
				phoneInputRef.current?.isValidNumber(phoneNumber) || false;
			return isValid && password.length >= 6;
		}
		if (step === 4) {
			return isStep4Valid();
		}
		// Steps 2, 3, 5, 6, 7 have no required fields → always valid
		return true;
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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
					<View style={styles.header}>
						<BackButton
							onPress={() => {
								if (step > 1) {
									setStep(step - 1);
								} else {
									router.back();
								}
							}}
						/>
						<PageTitle style={styles.title}>Book Consultation</PageTitle>
					</View>

					<BodyText style={styles.stepIndicator}>Step {step} of 7</BodyText>
					<StepProgressBar currentStep={step} totalSteps={7} />

					{/* Step 1 */}
					{step === 1 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>Create Account</NormalTitle>
							<BodyText style={styles.stepSubtitle}>
								Enter your phone number and set a password
							</BodyText>

							{/* Phone Number input */}
							<BodyText
								style={[
									styles.inputLabel,
									{
										color: colors.textPrimary,
									},
								]}
							>
								Phone Number
							</BodyText>
							<PhoneInput
								ref={phoneInputRef}
								defaultValue={phoneNumber}
								defaultCode="MM"
								layout="second"
								onChangeFormattedText={setPhoneNumber}
								containerStyle={{
									backgroundColor: colors.appBackground,
									width: "100%",
									height: 50,
									marginBottom: 16,
									gap: 10,
								}}
								countryPickerProps={{ renderFlagButton: undefined }}
								withShadow={false}
								autoFocus
								textContainerStyle={{
									backgroundColor: colors.appBackground,
									paddingVertical: 0,
									borderWidth: 1,
									borderColor: colors.primaryGray + 50,
									borderRadius: 15,
									paddingHorizontal: 12,
								}}
								flagButtonStyle={{
									borderWidth: 1,
									borderColor: colors.primaryGray + 50,
									borderRadius: 15,
									width: "30%",
								}}
								placeholder="xxx xxx xxx"
							/>

							{/* Password input with eye icon */}
							<BodyText
								style={[
									styles.inputLabel,
									{
										color: colors.textPrimary,
									},
								]}
							>
								Password
							</BodyText>
							<View
								style={[
									styles.passwordContainer,
									{
										borderColor: colors.border,
										backgroundColor: colors.surface,
									},
								]}
							>
								<TextInput
									style={[
										styles.passwordInput,
										{ borderColor: colors.border, color: colors.textPrimary },
									]}
									placeholder="Min 6 characters"
									placeholderTextColor={colors.textSecondary}
									secureTextEntry={!showPassword}
									value={password}
									onChangeText={setPassword}
								/>
								<TouchableOpacity
									onPress={() => setShowPassword(!showPassword)}
									style={styles.eyeIcon}
								>
									{showPassword ? (
										<EyeOff size={20} color={colors.textSecondary} />
									) : (
										<Eye size={20} color={colors.textSecondary} />
									)}
								</TouchableOpacity>
							</View>
						</View>
					)}

					{/* Step 2 */}
					{/* Step 2 */}
					{step === 2 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>
								Property Selected
							</NormalTitle>

							<View
								style={[
									styles.propertyCard,
									globalStyles.shadows,
									{ backgroundColor: colors.surface, borderRadius: 16 },
								]}
							>
								<Image
									source={{ uri: propertyImage }}
									style={[
										styles.propertyCardImage,
										{ borderTopLeftRadius: 16, borderTopRightRadius: 16 },
									]}
								/>
								<View style={styles.propertyCardInfo}>
									<NormalTitle
										style={[
											styles.propertyCardTitle,
											{ color: colors.textPrimary },
										]}
									>
										{propertyTitle}
									</NormalTitle>
									<View style={styles.locationRow}>
										<MapPin size={14} color={colors.primaryGold} />
										<BodyText
											style={[
												styles.propertyCardLocation,
												{ color: colors.textSecondary },
											]}
										>
											{propertyLocation}
										</BodyText>
									</View>
									<PageTitle
										style={[
											styles.propertyCardPrice,
											{ color: colors.primaryGold },
										]}
									>
										฿{formatPrice(parseInt(propertyPrice))}
									</PageTitle>
								</View>
							</View>

							{/* Agent container remains unchanged */}
							<View
								style={[
									styles.agentContainer,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<Image source={{ uri: agentImage }} style={styles.agentImage} />
								<View style={styles.agentInfo}>
									<NormalTitle style={styles.agentName}>
										{agentName}
									</NormalTitle>
									<BodyText style={styles.agentSubtitle}>
										{isAgent ? "Your Property Agent" : "Property Owner"}
									</BodyText>
								</View>
							</View>
						</View>
					)}

					{/* Step 3 */}
					{step === 3 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>Your Question</NormalTitle>
							<BodyText style={styles.stepSubtitle}>
								Optional – tell the agent what you&apos;d like to know
							</BodyText>

							<TextInput
								style={[
									styles.textArea,
									{
										borderColor: colors.primaryGray + 50,
										color: colors.textPrimary,
										backgroundColor: colors.background,
									},
									globalStyles.shadows,
								]}
								placeholder="e.g. Is the price negotiable? Is it near BTS?…"
								placeholderTextColor={colors.textSecondary}
								multiline
								numberOfLines={6}
								textAlignVertical="top"
								value={question}
								onChangeText={setQuestion}
							/>
						</View>
					)}

					{/* Step 4 */}
					{step === 4 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>Preferred Time</NormalTitle>
							<View style={styles.optionRow}>
								{/* Right now option */}
								<TouchableOpacity
									style={[
										styles.optionBox,
										{
											backgroundColor:
												selectedOption === "now"
													? colors.primaryGold + "20"
													: colors.background,
											borderColor:
												selectedOption === "now"
													? colors.primaryGold
													: colors.primaryGray + 50,
										},
									]}
									onPress={() => {
										setSelectedOption("now");
										setSelectedDate(null);
										setSelectedTime(null);
										setShowCalendar(false);
									}}
								>
									<View
										style={[
											styles.optionIconCircle,
											{ backgroundColor: colors.primaryGold + "20" },
										]}
									>
										<Zap size={24} color={colors.primaryGold} />
									</View>
									<NormalTitle style={styles.optionTitle}>
										Right now
									</NormalTitle>
									<BodyText style={styles.optionSubtitle}>
										Start immediately
									</BodyText>
								</TouchableOpacity>

								{/* Schedule option */}
								<TouchableOpacity
									style={[
										styles.optionBox,
										{
											backgroundColor:
												selectedOption === "schedule"
													? colors.primaryGold + "20"
													: colors.background,
											borderColor:
												selectedOption === "schedule"
													? colors.primaryGold
													: colors.primaryGray + 50,
										},
									]}
									onPress={() => setSelectedOption("schedule")}
								>
									<View
										style={[
											styles.optionIconCircle,
											{ backgroundColor: colors.primaryGold + "20" },
										]}
									>
										<CalendarDays size={24} color={colors.primaryGold} />
									</View>
									<NormalTitle style={styles.optionTitle}>Schedule</NormalTitle>
									<BodyText style={styles.optionSubtitle}>
										Pick date & time
									</BodyText>
								</TouchableOpacity>
							</View>

							{selectedOption === "schedule" && (
								<View style={styles.scheduleContainer}>
									{/* Calendar appears above the button when showCalendar is true */}
									{showCalendar && (
										<InlineCalendar
											selectedDate={selectedDate}
											onSelectDate={(date) => {
												setSelectedDate(date);
												setShowCalendar(false);
											}}
										/>
									)}

									<TouchableOpacity
										style={[
											styles.datePickerButton,
											{
												backgroundColor: colors.surface,
												borderColor: colors.primaryGray,
											},
										]}
										onPress={() => setShowCalendar(!showCalendar)}
									>
										<View style={styles.datePickerButtonContent}>
											<CalendarDays size={18} color={colors.textPrimary} />
											<BodyText
												style={{
													fontSize: 16,
													color: colors.textPrimary,
												}}
											>
												{selectedDate
													? formatDate(selectedDate)
													: "Pick a date"}
											</BodyText>
										</View>
									</TouchableOpacity>

									{selectedDate && (
										<View style={styles.timeSlotsContainer}>
											<View style={styles.timeGrid}>
												{timeSlots.map((time) => (
													<TouchableOpacity
														key={time}
														style={[
															styles.timeSlot,
															{
																backgroundColor: colors.background,
																borderColor: colors.primaryGray + 50,
															},
															selectedTime === time && {
																backgroundColor: colors.primaryGold,
																borderColor: colors.primaryGold,
															},
														]}
														onPress={() => setSelectedTime(time)}
													>
														<BodyText
															style={[
																styles.timeSlotText,
																{ color: colors.textPrimary },
																selectedTime === time
																	? styles.selectedTimeSlotText
																	: {},
															]}
														>
															{time}
														</BodyText>
													</TouchableOpacity>
												))}
											</View>
										</View>
									)}
								</View>
							)}
						</View>
					)}

					{/* Step 5 */}
					{step === 5 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>
								Consultation Fee
							</NormalTitle>
							<View
								style={[
									styles.feeBox,
									{
										backgroundColor: colors.surface,
										borderColor: colors.border,
									},
								]}
							>
								<BodyText style={styles.feeTitle}>
									Agent Consultation Fee
								</BodyText>
								<PageTitle style={{ color: colors.primaryRed, fontSize: 30 }}>
									0 MMK
								</PageTitle>
								<NormalTitle
									style={{
										color: colors.primaryGreen,
										textAlign: "center",
									}}
								>
									✦ Complimentary — Premium Promotion
								</NormalTitle>
							</View>
						</View>
					)}

					{/* Step 6 */}
					{step === 6 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>Platform</NormalTitle>
							<View style={styles.platformRow}>
								{/* Phone Call option */}
								<TouchableOpacity
									style={[
										styles.platformBox,
										{
											backgroundColor:
												platform === "phone"
													? colors.primaryGold + "20"
													: colors.background,
											borderColor:
												platform === "phone"
													? colors.primaryGold
													: colors.primaryGray + "50",
										},
									]}
									onPress={() => setPlatform("phone")}
								>
									<View
										style={[
											styles.platformIconCircle,
											{ backgroundColor: colors.primaryGold + 20 },
										]}
									>
										<Phone size={24} color={colors.primaryGold} />
									</View>
									<NormalTitle style={styles.platformText}>
										Phone Call
									</NormalTitle>
								</TouchableOpacity>

								{/* Zoom option */}
								<TouchableOpacity
									style={[
										styles.platformBox,
										{
											backgroundColor:
												platform === "zoom"
													? colors.primaryGold + "20"
													: colors.background,
											borderColor:
												platform === "zoom"
													? colors.primaryGold
													: colors.primaryGray + "50",
										},
									]}
									onPress={() => setPlatform("zoom")}
								>
									<View
										style={[
											styles.platformIconCircle,
											{ backgroundColor: colors.primaryGold + 20 },
										]}
									>
										<VideoIcon size={24} color={colors.primaryGold} />
									</View>
									<NormalTitle style={styles.platformText}>Zoom</NormalTitle>
								</TouchableOpacity>
							</View>

							{platform === "zoom" && (
								<View
									style={[
										styles.zoomInfoBox,
										{
											backgroundColor: colors.primaryGray + 20,
											borderColor: colors.primaryGray + 20,
										},
									]}
								>
									<BodyText
										style={{
											fontSize: 14,
											color: colors.textPrimary,
										}}
									>
										📹 A private Zoom link will be sent to you before your
										session.
									</BodyText>
								</View>
							)}

							{platform && (
								<View
									style={[
										styles.altContactBox,
										{
											backgroundColor: colors.background,
											padding: 10,
											borderRadius: 10,
										},
										globalStyles.shadows,
									]}
								>
									<BodyText style={styles.altContactTitle}>
										Optional – Alternative contact
									</BodyText>

									{/* Telegram input with icon outside */}
									<View style={styles.altInputRow}>
										<View style={[styles.altIconCircle]}>
											<MessageCircle size={20} color="#08c" />
										</View>
										<TextInput
											style={[
												styles.altInputField,
												{
													borderColor: colors.border,
													color: colors.textPrimary,
												},
											]}
											placeholder="Telegram ID (optional)"
											placeholderTextColor={colors.textSecondary}
											value={telegram}
											onChangeText={setTelegram}
										/>
									</View>

									{/* Viber input with icon outside */}
									<View style={styles.altInputRow}>
										<View style={[styles.altIconCircle]}>
											<Phone size={20} color="#7360f2" />
										</View>
										<TextInput
											style={[
												styles.altInputField,
												{
													borderColor: colors.border,
													color: colors.textPrimary,
												},
											]}
											placeholder="Viber number (optional)"
											placeholderTextColor={colors.textSecondary}
											value={viber}
											onChangeText={setViber}
										/>
									</View>
								</View>
							)}
						</View>
					)}

					{/* Step 7 */}
					{step === 7 && (
						<View style={styles.stepContainer}>
							<NormalTitle style={styles.stepTitle}>Confirmation</NormalTitle>

							{/* Phone row */}
							<View
								style={[
									styles.confirmCard,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<BodyText style={styles.confirmLabel}>Phone</BodyText>
								<NormalTitle style={styles.confirmValue}>
									{phoneNumber}
								</NormalTitle>
							</View>

							{/* Property row */}
							<View
								style={[
									styles.confirmCard,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<BodyText style={styles.confirmLabel}>Property</BodyText>
								<NormalTitle style={styles.confirmValue}>
									Luxury Condo at Sukhumvit 24
								</NormalTitle>
							</View>

							{/* Agent row */}
							<View
								style={[
									styles.confirmCard,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<BodyText style={styles.confirmLabel}>Agent</BodyText>
								<NormalTitle style={styles.confirmValue}>
									Aye Thandar
								</NormalTitle>
							</View>

							{/* Time row */}
							<View
								style={[
									styles.confirmCard,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<BodyText style={styles.confirmLabel}>Time</BodyText>
								<NormalTitle style={styles.confirmValue}>
									{selectedOption === "now"
										? "Right now"
										: selectedDate && selectedTime
											? `${selectedDate.toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric",
												})} at ${selectedTime}`
											: "-"}
								</NormalTitle>
							</View>

							{/* Platform row */}
							<View
								style={[
									styles.confirmCard,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<BodyText style={styles.confirmLabel}>Platform</BodyText>
								<NormalTitle style={styles.confirmValue}>
									{platform === "phone"
										? "Phone Call"
										: platform === "zoom"
											? "Zoom"
											: "-"}
								</NormalTitle>
							</View>

							{/* Fee row */}
							<View
								style={[
									styles.confirmCard,
									{ backgroundColor: colors.surface },
									globalStyles.shadows,
								]}
							>
								<BodyText style={styles.confirmLabel}>Fee</BodyText>
								<PageTitle
									style={[
										styles.confirmValue,
										{ color: colors.primaryRed, fontSize: 18 },
									]}
								>
									0 MMK
								</PageTitle>
							</View>
						</View>
					)}
				</ScrollView>
				<View
					style={[
						styles.bottomButtonContainer,
						{
							backgroundColor: colors.background,
						},
					]}
				>
					<TouchableOpacity
						style={[
							styles.continueButton,
							{ backgroundColor: colors.primaryGold },
							!isCurrentStepValid() && { opacity: 0.5 },
						]}
						onPress={() => {
							if (step === 7) {
								router.replace("/success");
							} else {
								handleContinue();
							}
						}}
						disabled={!isCurrentStepValid()}
					>
						<BodyText style={styles.continueText}>
							{step === 7 ? "✦ Confirm Appointment" : "Continue"}
						</BodyText>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

// Styles (updated to use theme colors where appropriate, but keep structure)
const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		gap: 12,
	},
	title: { marginBottom: 0 },
	stepIndicator: { fontSize: 12, marginBottom: 12 },
	stepContainer: { marginTop: 16 },
	stepTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
	stepSubtitle: { fontSize: 12, marginBottom: 16 },
	input: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		fontSize: 14,
	},
	continueButton: {
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
	},
	continueText: { color: "#fff", fontWeight: "600" },
	propertyImageContainer: {
		width: 100,
		height: 100,
		borderRadius: 8,
		overflow: "hidden",
	},
	propertyImage: { width: 100, height: 100, borderRadius: 8 },
	propertyInfo: { flex: 1, marginLeft: 12 },
	propertyName: { fontSize: 14, fontWeight: "600" },
	propertyLocation: { fontSize: 12, marginVertical: 2 },
	propertyDetails: { fontSize: 12 },
	agentContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	agentImage: { width: 50, height: 50, borderRadius: 10 },
	agentInfo: { marginLeft: 12 },
	agentName: { fontSize: 14, fontWeight: "600" },
	agentSubtitle: { fontSize: 12 },
	textArea: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		minHeight: 120,
		textAlignVertical: "top",
		marginBottom: 16,
		fontSize: 14,
	},
	optionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	optionBox: {
		flex: 1,
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 6,
		alignItems: "center",
		borderWidth: 1,
	},
	selectedOptionBox: { borderColor: "#000", backgroundColor: "#e8e8e8" },
	optionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
	optionSubtitle: { fontSize: 12, color: "#666" },
	scheduleContainer: { marginTop: 8, marginBottom: 16 },
	datePickerButton: {
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 12,
		borderWidth: 1,
	},
	calendarContainer: {
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		elevation: 2,
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	calendarHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	calendarNav: { fontSize: 20, paddingHorizontal: 12 },
	calendarMonth: { fontSize: 16, fontWeight: "600" },
	calendarWeekDays: { flexDirection: "row", marginBottom: 8 },
	weekDay: { flex: 1, textAlign: "center", fontWeight: "500", fontSize: 12 },
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
	timeSlotsContainer: { marginTop: 8 },
	timeGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	timeSlot: {
		width: "23%",
		paddingVertical: 12,
		marginBottom: 8,
		borderRadius: 8,
		alignItems: "center",
		borderWidth: 1,
	},
	timeSlotText: { fontSize: 14 },
	selectedTimeSlotText: { color: "#fff" },
	feeBox: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		alignItems: "center",
	},
	feeTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
	feeSubtitle: { fontSize: 12 },
	platformRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 12,
		gap: 16,
	},
	platformBox: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
	},
	platformBoxSelected: { borderColor: "#000", backgroundColor: "#e6e6e6" },
	platformIcon: { fontSize: 24, marginBottom: 8 },
	platformText: { fontSize: 14, fontWeight: "600" },
	altContactBox: { marginTop: 12 },
	altContactTitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
	zoomInfoBox: {
		padding: 12,
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 12,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		marginBottom: 4,
	},
	infoLabel: { fontSize: 14 },
	infoValue: { fontSize: 14, fontWeight: "600" },
	bottomButtonContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
		paddingTop: 8,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: "500",
		marginBottom: 6,
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,

		borderRadius: 8,
		marginBottom: 16,
	},
	passwordInput: {
		flex: 1,
		padding: 12,
		fontSize: 14,
		borderWidth: 0,
	},
	eyeIcon: {
		padding: 12,
	},
	propertyCard: {
		marginBottom: 16,
	},
	propertyCardImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	propertyCardInfo: {
		padding: 16,
	},
	propertyCardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 8,
	},
	propertyCardLocation: {
		fontSize: 14,
	},
	propertyCardPrice: {
		fontSize: 20,
		marginTop: 4,
	},
	optionIconCircle: {
		width: 48,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	datePickerButtonContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		alignSelf: "flex-start",
	},
	calendarDayText: {
		fontSize: 14,
		textAlign: "center",
	},
	platformIconCircle: {
		width: 48,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	altInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 12,
		paddingHorizontal: 12,
	},
	altInput: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 14,
		marginLeft: 8,
	},
	altInputRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		gap: 12,
	},
	altIconCircle: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	altInputField: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 12,
		fontSize: 14,
	},
	confirmCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
	},
	confirmLabel: {
		fontSize: 14,
		color: "#717684",
	},
	confirmValue: {
		fontSize: 16,
		fontWeight: "600",
		color: "black",
	},
});
