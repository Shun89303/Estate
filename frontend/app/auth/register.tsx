import { useState } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import Title from "@/components/common/typography/Title";
import NextButton from "@/components/common/navigation/NextButton";
import SkipButton from "@/components/common/navigation/SkipButton";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

export default function RegisterScreen() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { register, isLoading } = useAuthStore();
	const router = useRouter();

	const handleRegister = async () => {
		if (!phone || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}
		try {
			await register(phone, password);
			router.replace("/(tabs)");
		} catch (error: any) {
			Alert.alert("Registration Failed", error.message);
		}
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardView}
			>
				<View style={styles.form}>
					<Title variant="page" style={styles.title}>
						Create Account
					</Title>

					<TextInput
						style={styles.input}
						placeholder="Phone Number"
						placeholderTextColor={lightColors.bodyText}
						value={phone}
						onChangeText={setPhone}
						keyboardType="phone-pad"
						autoCapitalize="none"
					/>

					<TextInput
						style={styles.input}
						placeholder="Password"
						placeholderTextColor={lightColors.bodyText}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<TextInput
						style={styles.input}
						placeholder="Confirm Password"
						placeholderTextColor={lightColors.bodyText}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>

					<NextButton
						onPress={handleRegister}
						title="Register"
						disabled={isLoading}
						variant="primary"
					/>

					<SkipButton
						onPress={() => router.push("/auth/login")}
						title="Already have an account? Login"
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	keyboardView: { flex: 1, justifyContent: "center" },
	form: { paddingHorizontal: spacing.lg, gap: spacing.md },
	title: { textAlign: "center", marginBottom: spacing.md },
	input: {
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
		borderRadius: scaleSize(8),
		padding: spacing.md,
		fontSize: moderateScale(16),
		color: lightColors.bigTitleText,
		backgroundColor: lightColors.background,
	},
});
