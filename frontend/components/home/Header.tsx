import { View, StyleSheet } from "react-native";
import { PageTitle } from "../atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import NotificationBell from "../common/NotificationBell";

export default function Header() {
	const colors = useTheme();

	return (
		<View style={styles.container}>
			<PageTitle
				style={{
					color: colors.textPrimary,
				}}
			>
				Pandora Property
			</PageTitle>
			<NotificationBell />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	iconButton: {
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	bellWrapper: {
		position: "relative",
	},
	redDot: {
		position: "absolute",
		top: -2,
		right: -2,
		width: 8,
		height: 8,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#fff",
	},
});
