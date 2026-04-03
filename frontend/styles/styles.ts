import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
	shadows: {
		// iOS shadow
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 5, // increased for blurrier shadow
		// Android shadow
		elevation: 1, // increased for softer shadow
	},
});

export default globalStyles;
