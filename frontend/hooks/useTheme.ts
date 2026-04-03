import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "../app/_theme";

export function useTheme() {
	const colorScheme = useColorScheme();
	return colorScheme === "dark" ? darkColors : lightColors;
}
