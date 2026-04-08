import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

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
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardView}
			>
				<View style={styles.form}>
					<Text style={styles.title}>Create Account</Text>

					<TextInput
						style={styles.input}
						placeholder="Phone Number"
						value={phone}
						onChangeText={setPhone}
						keyboardType="phone-pad"
						autoCapitalize="none"
					/>

					<TextInput
						style={styles.input}
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<TextInput
						style={styles.input}
						placeholder="Confirm Password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>

					<TouchableOpacity
						style={styles.button}
						onPress={handleRegister}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.buttonText}>Register</Text>
						)}
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.push("/auth/login")}>
						<Text style={styles.link}>Already have an account? Login</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	keyboardView: { flex: 1, justifyContent: "center" },
	form: { paddingHorizontal: 20, gap: 16 },
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 24,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#2c6e9e",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
	link: { textAlign: "center", marginTop: 12, color: "#2c6e9e", fontSize: 14 },
});
