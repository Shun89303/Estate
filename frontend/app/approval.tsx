import { useRouter } from "expo-router";
import { View, Pressable, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Approval() {
	const router = useRouter();

	const steps = [
		"Our team reviews your profile (1–2 business days)",
		"You'll receive a notification once approved",
		"Start uploading & managing property listings",
	];

	return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
			>
				<View>
					{/* Title and subtitle */}
					<Text style={styles.title}>Awaiting Approval</Text>
					<Text style={styles.subtitle}>
						Your profile has been submitted for review. An admin will verify
						your account shortly.
					</Text>

					{/* Container box */}
					<View style={styles.box}>
						<Text style={styles.boxTitle}>WHAT HAPPENS NEXT?</Text>
						{steps.map((stepText, index) => (
							<View key={index} style={styles.boxStep}>
								<Text style={styles.boxStepNumber}>{index + 1}</Text>
								<Text style={styles.boxStepText}>{stepText}</Text>
							</View>
						))}
					</View>
				</View>

				{/* Back to Login button */}
				<Pressable onPress={() => router.push("/")} style={styles.loginButton}>
					<Text style={styles.loginButtonText}>Back to Login</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
		color: "#666",
		marginBottom: 24,
	},
	box: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 12,
		padding: 16,
		backgroundColor: "#f9f9f9",
		marginBottom: 24,
	},
	boxTitle: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 16,
	},
	boxStep: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 12,
	},
	boxStepNumber: {
		fontWeight: "700",
		marginRight: 8,
		color: "#000",
		width: 20,
		textAlign: "center",
	},
	boxStepText: {
		flex: 1,
		fontSize: 14,
		color: "#333",
	},
	loginButton: {
		backgroundColor: "#000",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	loginButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 14,
	},
});
