import { View, StyleSheet } from "react-native";
import NotificationBell from "../common/utils/NotificationBell";
import Logo from "../common/brand/Logo";
import { spacing } from "@/utils/metrics";

export default function Header() {
	return (
		<View style={styles.container}>
			<Logo />
			<NotificationBell />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: spacing.lg, // was 16
	},
});
