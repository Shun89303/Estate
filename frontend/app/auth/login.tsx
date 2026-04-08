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

export default function LoginScreen() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading } = useAuthStore();
	const router = useRouter();

	const handleLogin = async () => {
		if (!phone || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}
		try {
			await login(phone, password);
			router.replace("/(tabs)");
		} catch (error: any) {
			Alert.alert("Login Failed", error.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardView}
			>
				<View style={styles.form}>
					<Text style={styles.title}>Welcome Back</Text>

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

					<TouchableOpacity
						style={styles.button}
						onPress={handleLogin}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.buttonText}>Login</Text>
						)}
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.push("/auth/register")}>
						<Text style={styles.link}>
							Don&apos;t have an account? Register
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.back()}>
						<Text style={styles.link}>Continue as Guest</Text>
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
