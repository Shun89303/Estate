// components/common/NotificationBell.tsx
import { Pressable, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";

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
	const colors = useTheme();

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
						style={[styles.redDot, { backgroundColor: colors.primaryRed }]}
					/>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
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
