import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CircleCheckBig, Bell } from "lucide-react-native";
import { BodyText, PageTitle } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";

export default function Success() {
	const router = useRouter();
	const colors = useTheme();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.content}>
				{/* Big success icon */}
				<View
					style={[
						styles.iconCircle,
						{ backgroundColor: colors.primaryGreen + "20" },
					]}
				>
					<CircleCheckBig size={64} color={colors.primaryGreen} />
				</View>

				<PageTitle style={styles.title}>Booking Confirmed</PageTitle>
				<BodyText style={[styles.subtitle, { color: colors.textSecondary }]}>
					Your consultation has been reserved successfully.
				</BodyText>

				{/* Notification Box */}
				<View
					style={[
						styles.notiBox,
						{ backgroundColor: colors.surface, ...globalStyles.shadows },
					]}
				>
					<View
						style={[
							styles.notiIconCircle,
							{ backgroundColor: colors.primaryGold + 20 },
						]}
					>
						<Bell size={20} color={colors.primaryGold} />
					</View>
					<BodyText style={[styles.notiText, { color: colors.textPrimary }]}>
						You&apos;ll receive a reminder before your appointment.
					</BodyText>
				</View>

				{/* Buttons */}
				<View style={styles.buttonContainer}>
					<Pressable
						style={[
							styles.primaryButton,
							{ backgroundColor: colors.primaryGold },
						]}
						onPress={() => router.push("/bookings")}
					>
						<BodyText style={styles.primaryButtonText}>
							View My Appointments
						</BodyText>
					</Pressable>

					<Pressable style={styles.textButton} onPress={() => router.push("/")}>
						<BodyText
							style={[styles.textButtonText, { color: colors.textPrimary }]}
						>
							Back to Home
						</BodyText>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	iconCircle: {
		width: 100,
		height: 100,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 24,
	},
	title: {
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		textAlign: "center",
		marginBottom: 24,
	},
	notiBox: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 16,
		marginBottom: 32,
		width: "100%",
	},
	notiIconCircle: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	notiText: {
		flex: 1,
		fontSize: 14,
		lineHeight: 20,
	},
	buttonContainer: {
		width: "100%",
		alignItems: "center",
	},
	primaryButton: {
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 15,
		width: "100%",
		marginBottom: 12,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	textButton: {
		alignItems: "center",
		paddingVertical: 14,
		width: "100%",
	},
	textButtonText: {
		fontWeight: "600",
		fontSize: 16,
	},
});
