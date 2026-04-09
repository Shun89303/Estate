import { TouchableOpacity, View, StyleSheet } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";
import { BodyText } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";

interface FilterButtonProps {
	isOpen: boolean;
	activeCount: number;
	onPress: () => void;
	size?: number;
	iconColorWhenClosed?: string;
	iconColorWhenOpen?: string;
	badgeBackgroundColor?: string;
}

export default function FilterButton({
	isOpen,
	activeCount,
	onPress,
	size = 24,
	iconColorWhenClosed = "#000",
	iconColorWhenOpen,
	badgeBackgroundColor,
}: FilterButtonProps) {
	const colors = useTheme();
	const iconColor = isOpen
		? iconColorWhenOpen || colors.primaryGold
		: iconColorWhenClosed;

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.button, isOpen && { backgroundColor: colors.border }]}
		>
			<View style={styles.iconWrapper}>
				<SlidersHorizontal size={size} color={iconColor} />
				{activeCount > 0 && (
					<View
						style={[
							styles.badge,
							{ backgroundColor: badgeBackgroundColor || colors.primaryGold },
						]}
					>
						<BodyText style={styles.badgeText}>{activeCount}</BodyText>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 5,
		borderRadius: 10,
	},
	iconWrapper: {
		position: "relative",
	},
	badge: {
		position: "absolute",
		top: -6,
		right: -6,
		borderRadius: 10,
		minWidth: 18,
		height: 18,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 4,
	},
	badgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
});
