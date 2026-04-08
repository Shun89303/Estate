import { Alert } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

/**
 * Guard function to ensure user is authenticated before executing an action.
 * @param action - The function to execute if authenticated
 * @param message - Optional custom login message
 * @returns boolean - true if authenticated and action executed, false otherwise
 */
export function requireAuth(action: () => void, message?: string): boolean {
	const isAuthenticated = useAuthStore.getState().isAuthenticated;

	if (!isAuthenticated) {
		Alert.alert("Login Required", message || "Please log in to continue.", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Login", onPress: () => router.push("/auth/login") },
		]);
		return false;
	}

	action();
	return true;
}
