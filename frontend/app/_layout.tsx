import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCoinStore } from "@/stores/coinStore";
import { useSavedPropertiesStore } from "@/stores/savedPropertiesStore";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const color = useTheme();
	const { user, isAuthenticated } = useAuthStore();
	const { loadUserData } = useCoinStore();
	const { loadUserData: loadSavedData } = useSavedPropertiesStore();

	useEffect(() => {
		if (isAuthenticated && user?.uid) {
			loadUserData(user.uid);
			loadSavedData(user.uid);
		}
	}, [isAuthenticated, user]);

	return (
		<GestureHandlerRootView
			style={{ flex: 1, backgroundColor: color.appBackground }}
		>
			<BottomSheetModalProvider>
				<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
				<Stack
					screenOptions={{ headerShown: false }}
					initialRouteName="(tabs)"
				/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
