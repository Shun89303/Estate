import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

export default function Login() {
	const router = useRouter();

	return (
		<SafeAreaView
			style={{
				flex: 1,
				padding: 16,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* Logo */}
			<View
				style={{
					width: 80,
					height: 80,
					borderRadius: 16,
					backgroundColor: "#000",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: 24,
				}}
			>
				<Text style={{ color: "#fff", fontSize: 32, fontWeight: "700" }}>
					P
				</Text>
			</View>

			{/* Title */}
			<Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}>
				Agent Portal
			</Text>

			{/* Subtitle */}
			<Text
				style={{
					fontSize: 14,
					color: "#666",
					textAlign: "center",
					marginBottom: 32,
				}}
			>
				Sign in to manage your listings
			</Text>

			{/* Continue with Google button */}
			<TouchableOpacity
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					paddingVertical: 12,
					paddingHorizontal: 24,
					borderRadius: 8,
					backgroundColor: "#fff",
					elevation: 2,
					marginBottom: 16,
				}}
				onPress={() => router.push("/login/loginProcess")}
			>
				<AntDesign
					name="google"
					size={20}
					// color="#DB4437"
					style={{ marginRight: 8 }}
				/>
				<Text style={{ fontWeight: "600" }}>Continue with Google</Text>
			</TouchableOpacity>

			{/* Terms */}
			<Text
				style={{
					fontSize: 12,
					color: "#666",
					textAlign: "center",
					lineHeight: 16,
					marginHorizontal: 16,
				}}
			>
				By continuing, you agree to our{" "}
				<Text style={{ textDecorationLine: "underline" }}>
					Terms of Service
				</Text>{" "}
				and{" "}
				<Text style={{ textDecorationLine: "underline" }}>Privacy Policy</Text>.
			</Text>
		</SafeAreaView>
	);
}
