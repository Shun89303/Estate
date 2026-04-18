import { TouchableOpacity, TouchableOpacityProps, Alert } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

interface RequireAuthProps extends TouchableOpacityProps {
	onPress: () => void;
	message?: string;
	children: React.ReactNode;
}

export default function RequireAuth({
	onPress,
	message,
	children,
	...touchableProps
}: RequireAuthProps) {
	const isAuthenticated = useAuthStore.getState().isAuthenticated;

	const handlePress = () => {
		if (isAuthenticated) {
			onPress();
		} else {
			Alert.alert("Login Required", message || "Please log in to continue.", [
				{ text: "Cancel", style: "cancel" },
				{ text: "Login", onPress: () => router.push("/auth/login") },
			]);
		}
	};

	return (
		<TouchableOpacity onPress={handlePress} {...touchableProps}>
			{children}
		</TouchableOpacity>
	);
}
