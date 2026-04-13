import { Pressable, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import globalStyles from "@/styles/styles";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface NotificationBellProps {
	onPress?: () => void; // optional override
	hasUnread?: boolean;
	iconColor?: string;
	size?: number;
}

export default function NotificationBell({
	onPress,
	hasUnread = true,
	iconColor = "#333",
	size = 20,
}: NotificationBellProps) {
	const router = useRouter();

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			router.push("/notifications");
		}
	};

	return (
		<Pressable
			onPress={handlePress}
			style={[styles.iconButton, globalStyles.shadows]}
		>
			<View style={styles.bellWrapper}>
				<Bell size={size} color={iconColor} />
				{hasUnread && (
					<View
						style={[
							styles.redDot,
							{
								backgroundColor: lightColors.danger,
								borderColor: lightColors.background,
							},
						]}
					/>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	iconButton: {
		backgroundColor: lightColors.background,
		padding: spacing.sm,
		borderRadius: scaleSize(10),
	},
	bellWrapper: {
		position: "relative",
	},
	redDot: {
		position: "absolute",
		top: -scaleSize(2),
		right: -scaleSize(2),
		width: scaleSize(8),
		height: scaleSize(8),
		borderRadius: scaleSize(4),
		borderWidth: scaleSize(1),
	},
});
