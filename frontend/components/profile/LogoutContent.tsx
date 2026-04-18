import { View, TouchableOpacity, StyleSheet } from "react-native";
import { LogOut } from "lucide-react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";

interface LogoutContentProps {
	onClose: () => void;
}

export default function LogoutContent({ onClose }: LogoutContentProps) {
	const { logout } = useAuthStore();
	const router = useRouter();

	const handleLogout = () => {
		onClose();
		logout();
		router.push("/auth/login");
	};

	return (
		<View style={styles.container}>
			<View
				style={[styles.iconCircle, { backgroundColor: lightColors.dangerBG }]}
			>
				<LogOut size={moderateScale(32)} color={lightColors.danger} />
			</View>
			<Title variant="page" style={styles.title}>
				Log Out?
			</Title>
			<BodyText variant="normal" style={styles.message}>
				Are you sure you want to log out of your account?
			</BodyText>
			<View style={styles.buttons}>
				<TouchableOpacity
					style={[
						styles.cancelButton,
						{ borderColor: lightColors.mutedBorder },
					]}
					onPress={onClose}
				>
					<BodyText
						variant="normal"
						style={{ color: lightColors.bigTitleText }}
					>
						Cancel
					</BodyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.confirmButton,
						{ backgroundColor: lightColors.danger },
					]}
					onPress={handleLogout}
				>
					<BodyText variant="normal" style={{ color: "#fff" }}>
						Log Out
					</BodyText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.lg,
		alignItems: "center",
	},
	iconCircle: {
		width: scaleSize(64),
		height: scaleSize(64),
		borderRadius: scaleSize(15),
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing.lg,
	},
	title: {
		marginBottom: spacing.sm,
		textAlign: "center",
	},
	message: {
		textAlign: "center",
		marginBottom: spacing.xl,
		paddingHorizontal: spacing.lg,
	},
	buttons: {
		flexDirection: "row",
		gap: spacing.sm,
		width: "100%",
	},
	cancelButton: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		borderWidth: scaleSize(1),
	},
	confirmButton: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
	},
});
