import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const color = useTheme();
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
